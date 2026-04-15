/**
 * Calcula a linha de tendência linear pelo método dos Mínimos Quadrados (OLS).
 *
 * O objetivo é encontrar a reta ŷ = slope × x + intercept que minimiza
 * a soma dos erros quadráticos entre os valores reais (usuarios) e os
 * valores previstos pela reta. Isso separa o sinal (crescimento real)
 * do ruído (variação aleatória introduzida em predictions.js).
 *
 * Os somatórios abaixo são os termos necessários para o sistema de
 * equações normais do OLS:
 *   sumX  = Σx       (soma dos índices de tempo)
 *   sumY  = Σy       (soma dos valores de usuários)
 *   sumXY = Σ(x×y)   (soma dos produtos índice × usuários)
 *   sumXX = Σ(x²)    (soma dos quadrados dos índices)
 *
 * Fórmulas derivadas da minimização do erro quadrático médio:
 *   slope     = (n×ΣXY − ΣX×ΣY) / (n×ΣX² − (ΣX)²)
 *   intercept = (ΣY − slope×ΣX) / n
 *
 * A equação final da reta é: ŷ(i) = slope × i + intercept
 */
export function linearTrend(data) {
  const n = data.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

  data.forEach((item, i) => {
    sumX  += i;
    sumY  += item.usuarios;
    sumXY += i * item.usuarios;
    sumXX += i * i;
  });

  // Inclinação da reta (quanto os usuários crescem por mês em média)
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);

  // Intercepto (valor estimado da reta no mês 0)
  const intercept = (sumY - slope * sumX) / n;

  // Aplica a equação da reta a cada ponto e adiciona o campo tendencia
  return data.map((item, i) => ({
    ...item,
    tendencia: Math.round(slope * i + intercept)
  }));
}
