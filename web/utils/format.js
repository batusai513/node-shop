const LOCALE = 'es-CO';
const defaults = {
  currency: 'COP',
};

export function formatMoney(options, amount) {
  const o = {
    ...defaults,
    ...options,
    ...(amount % 100 == 0
      ? { minimumFractionDigits: 0 }
      : { minimumFractionDigits: 2 }),
    style: 'currency',
  };

  return new Intl.NumberFormat(LOCALE, o).format(amount / 100);
}
