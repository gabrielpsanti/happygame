export function linearTrend(data) {
  const n = data.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

  data.forEach((item, i) => {
    sumX += i;
    sumY += item.usuarios;
    sumXY += i * item.usuarios;
    sumXX += i * i;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return data.map((item, i) => ({
    ...item,
    tendencia: Math.round(slope * i + intercept)
  }));
}