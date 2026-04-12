export function exponentialGrowth(t, a = 100, b = 0.2) {
  return a * Math.pow(1 + b, t);
}

export function generateUsers(months = 6) {
  return Array.from({ length: months }, (_, i) => ({
    mes: `Mês ${i}`,
    usuarios: Math.round(exponentialGrowth(i) + Math.random() * 10)
  }));
}