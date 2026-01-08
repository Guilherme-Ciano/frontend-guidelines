export function formatCurrency(
  value: number,
  locale = 'pt-BR',
  currency = 'BRL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

export function formatDate(
  date: Date | string | number,
  locale = 'pt-BR',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

export function formatNumber(
  value: number,
  locale = 'pt-BR',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatPercentage(
  value: number,
  locale = 'pt-BR',
  decimals = 2
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}
