export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const diffMs = Date.now() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 1) {
    return 'agora'
  }

  if (diffHours < 24) {
    return `${diffHours}h atrás`
  }

  const diffDays = Math.floor(diffHours / 24)

  if (diffDays === 1) {
    return 'ontem'
  }

  if (diffDays < 7) {
    return `${diffDays} dias atrás`
  }

  return date.toLocaleDateString('pt-BR')
}
