export function formatDateLocale(
  value: string,
  locale = 'pt-BR',
): string {
  if (!value) {
    return '—'
  }

  return new Date(value).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
