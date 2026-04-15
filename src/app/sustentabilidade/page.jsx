"use client";
import Head from 'next/head';

export default function Sustentabilidade() {
  return (
    <>
      <Head><title>Sustentabilidade | HappyGame</title></Head>
      <div className="bg-card p-8 rounded-xl border border-principal max-w-3xl mx-auto shadow-xl">

        <h1 className="text-3xl font-bold mb-4 text-principal">
          🌱 Games e Sustentabilidade
        </h1>

        <p className="mb-6 text-gray-300">
          Os games fazem parte da vida de milhões de pessoas — e esse impacto vai muito além da diversão.
          Conhecer os efeitos dos jogos na saúde, no meio ambiente e na sociedade nos ajuda a jogar de forma mais consciente.
        </p>

        <h2 className="text-xl font-semibold mb-2 text-principal">🧠 Benefícios para a saúde</h2>
        <ul className="space-y-2 mb-6 text-gray-300">
          <li className="flex items-start gap-2"><span>•</span> Jogos de estratégia e puzzles estimulam memória, concentração e raciocínio lógico.</li>
          <li className="flex items-start gap-2"><span>•</span> Partidas curtas e sessões controladas ajudam a reduzir o estresse e a ansiedade.</li>
          <li className="flex items-start gap-2"><span>•</span> Jogos de ritmo e dança melhoram coordenação motora e disposição física.</li>
          <li className="flex items-start gap-2"><span>•</span> Lembre-se: pausas regulares, boa postura e iluminação adequada fazem toda a diferença!</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2 text-principal">♻️ Games e meio ambiente</h2>
        <ul className="space-y-2 mb-6 text-gray-300">
          <li className="flex items-start gap-2"><span>•</span> Servidores de jogos online consomem grandes quantidades de energia elétrica globalmente.</li>
          <li className="flex items-start gap-2"><span>•</span> Consoles e PCs geram resíduos eletrônicos (e-waste) ao final de sua vida útil — descarte no ponto de coleta correto.</li>
          <li className="flex items-start gap-2"><span>•</span> Microsoft e Sony anunciaram metas de neutralidade de carbono para seus serviços de cloud gaming.</li>
          <li className="flex items-start gap-2"><span>•</span> Prefira downloads digitais a mídias físicas para reduzir embalagens e transporte.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2 text-principal">🤝 Inclusão e diversidade</h2>
        <ul className="space-y-2 mb-6 text-gray-300">
          <li className="flex items-start gap-2"><span>•</span> O Xbox Adaptive Controller da Microsoft permite que pessoas com deficiência motora joguem com mais autonomia.</li>
          <li className="flex items-start gap-2"><span>•</span> Mais jogos estão incluindo opções de acessibilidade: legendas, alto contraste, remapeamento de controles.</li>
          <li className="flex items-start gap-2"><span>•</span> Representatividade importa — personagens diversos tornam os games mais ricos para todos.</li>
        </ul>

        <div className="mt-6 bg-principal p-4 rounded-lg text-center font-bold">
          Jogar bem é jogar com consciência — cuide de você, do planeta e da comunidade gamer! 🎮🌍
        </div>

      </div>
    </>
  );
}
