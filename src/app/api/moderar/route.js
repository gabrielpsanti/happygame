import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { texto } = await request.json();

    if (!texto || !texto.trim()) {
      return NextResponse.json({ aprovado: true, scores: {} });
    }

    const API_KEY = process.env.PERSPECTIVE_API_KEY;

    if (!API_KEY) {
      console.warn('PERSPECTIVE_API_KEY não configurada. Pulando moderação.');
      return NextResponse.json({ aprovado: true, scores: {} });
    }

    const response = await fetch(
      `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: { text: texto },
          languages: ['pt', 'en'],
          requestedAttributes: {
            TOXICITY: {},
            SEVERE_TOXICITY: {},
            INSULT: {},
            THREAT: {},
            PROFANITY: {}
          }
        })
      }
    );

    if (!response.ok) {
      console.error('Erro na Perspective API:', response.status);
      return NextResponse.json({ aprovado: true, scores: {}, apiError: true });
    }

    const data = await response.json();

    const scores = {};
    for (const [attr, val] of Object.entries(data.attributeScores)) {
      scores[attr] = Math.round(val.summaryScore.value * 100);
    }

    // Bloquear se toxicidade >= 70% OU insulto >= 80% OU ameaça >= 70%
    const aprovado = !(
      scores.TOXICITY >= 70 ||
      scores.SEVERE_TOXICITY >= 50 ||
      scores.INSULT >= 80 ||
      scores.THREAT >= 70
    );

    return NextResponse.json({
      aprovado,
      scores,
      motivo: !aprovado ? getMotivoRejeicao(scores) : null
    });

  } catch (error) {
    console.error('Erro no serviço de moderação:', error);
    return NextResponse.json({ aprovado: true, scores: {} });
  }
}

function getMotivoRejeicao(scores) {
  if (scores.SEVERE_TOXICITY >= 50) return 'Conteúdo severamente tóxico detectado';
  if (scores.THREAT >= 70) return 'Conteúdo com ameaças detectado';
  if (scores.TOXICITY >= 70) return 'Conteúdo tóxico detectado';
  if (scores.INSULT >= 80) return 'Conteúdo com insultos detectado';
  return 'Conteúdo inadequado detectado';
}
