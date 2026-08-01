import type { GitHubRepositoryDto } from '@/core/domain/github'
import { formatCompactNumber } from '@/shared/utils/format-number'
import './RepositoryMobileStatsGrid.css'

type RepositoryMobileStatsGridProps = {
  repository: GitHubRepositoryDto
}

const STATS = [
  { key: 'stars', label: 'Stars', icon: 'bi-star-fill', value: (repo: GitHubRepositoryDto) => repo.stargazersCount },
  { key: 'forks', label: 'Forks', icon: 'bi-diagram-3', value: (repo: GitHubRepositoryDto) => repo.forksCount },
  { key: 'watching', label: 'Watching', icon: 'bi-eye', value: (repo: GitHubRepositoryDto) => repo.watchersCount },
  { key: 'issues', label: 'Issues', icon: 'bi-exclamation-circle', value: (repo: GitHubRepositoryDto) => repo.openIssuesCount },
] as const

export function RepositoryMobileStatsGrid({
  repository,
}: RepositoryMobileStatsGridProps) {
  return (
    <section className="repository-mobile-stats">
      {STATS.map((stat) => (
        <div key={stat.key} className="repository-mobile-stats__item">
          <div className="repository-mobile-stats__label">
            <i className={`bi ${stat.icon}`} aria-hidden="true" />
            <span>{stat.label}</span>
          </div>
          <span className="repository-mobile-stats__value">
            {formatCompactNumber(stat.value(repository))}
          </span>
        </div>
      ))}
    </section>
  )
}
