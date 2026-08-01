import type { RepositoryLanguageDto } from '@/core/domain/github'

const LANGUAGE_COLORS = [
  '#38bdf8',
  '#ffc176',
  '#bdc2ff',
  '#f472b6',
  '#34d399',
]

export function mapRepositoryLanguages(
  languages: Record<string, number>,
): RepositoryLanguageDto[] {
  const total = Object.values(languages).reduce((sum, value) => sum + value, 0)

  if (total === 0) {
    return []
  }

  return Object.entries(languages).map(([name, bytes], index) => ({
    name,
    percentage: Math.round((bytes / total) * 100),
    color: LANGUAGE_COLORS[index % LANGUAGE_COLORS.length],
  }))
}
