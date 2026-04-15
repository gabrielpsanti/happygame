/**
 * Calcula o crescimento exponencial em um dado período t.
 *
 * Fórmula: f(t) = a × (1 + b)^t
 *   - a: população inicial (valor no período 0)
 *   - b: taxa de crescimento por período (0.2 = 20% ao mês)
 *   - t: índice de tempo (mês 0, 1, 2...)
 *
 * O modelo exponencial é adequado para estágios iniciais de adoção de
 * produtos digitais, onde cada usuário tende a trazer novos usuários
 * (efeito de rede), gerando crescimento composto.
 */
export function exponentialGrowth(t, a = 100, b = 0.2) {
  return a * Math.pow(1 + b, t);
}

/**
 * Gera um array simulado de usuários por mês.
 *
 * Para cada mês i, aplica exponentialGrowth(i) e soma um ruído aleatório
 * de até +10 usuários. Esse ruído simula fatores não modelados pela curva
 * exponencial pura: sazonalidade, campanhas de marketing, variações de
 * engajamento. O Math.round garante que o número de usuários seja inteiro.
 */
export function generateUsers(months = 6) {
  return Array.from({ length: months }, (_, i) => ({
    mes: `Mês ${i}`,
    usuarios: Math.round(exponentialGrowth(i) + Math.random() * 10)
  }));
}
