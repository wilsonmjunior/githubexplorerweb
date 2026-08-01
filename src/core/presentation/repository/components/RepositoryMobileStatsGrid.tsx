import type { GitHubRepositoryDto } from '@/core/domain/github'
import { StatsGrid } from '@/shared/components/StatsGrid'
import { formatCompactNumber } from '@/shared/utils/format-number'

type RepositoryMobileStatsGridProps = {
  repository: GitHubRepositoryDto
}

export function RepositoryMobileStatsGrid({
  repository,
}: RepositoryMobileStatsGridProps) {
  return (
    <StatsGrid
      variant="mobile"
      items={[
        {
          label: 'Estrelas',
          icon: 'bi-star-fill',
          value: formatCompactNumber(repository.stargazersCount),
        },
        {
          label: 'Forks',
          icon: 'bi-diagram-3',
          value: formatCompactNumber(repository.forksCount),
        },
        {
          label: 'Observando',
          icon: 'bi-eye',
          value: formatCompactNumber(repository.watchersCount),
        },
        {
          label: 'Issues',
          icon: 'bi-exclamation-circle',
          value: formatCompactNumber(repository.openIssuesCount),
        },
      ]}
    />
  )
}
