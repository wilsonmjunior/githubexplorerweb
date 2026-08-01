import type { AuthenticatedGitHubUserDto } from '@/core/domain/github'
import { formatCompactNumber } from '@/shared/utils/format-number'
import './AccountStatsGrid.css'

type AccountStatsGridProps = {
  user: AuthenticatedGitHubUserDto
}

type StatItem = {
  label: string
  value: string
  icon: string
}

export function AccountStatsGrid({ user }: AccountStatsGridProps) {
  const stats: StatItem[] = [
    {
      label: 'Repositórios públicos',
      value: formatCompactNumber(user.publicRepos),
      icon: 'bi-folder',
    },
    {
      label: 'Repositórios privados',
      value: formatCompactNumber(user.totalPrivateRepos),
      icon: 'bi-lock',
    },
    {
      label: 'Gists públicos',
      value: formatCompactNumber(user.publicGists),
      icon: 'bi-file-code',
    },
    {
      label: 'Colaboradores',
      value: formatCompactNumber(user.collaborators),
      icon: 'bi-people',
    },
  ]

  return (
    <section className="account-stats-grid" aria-label="Estatísticas da conta">
      {stats.map((stat) => (
        <article key={stat.label} className="account-stats-grid__item glass-card">
          <i className={`bi ${stat.icon} account-stats-grid__icon`} aria-hidden="true" />
          <span className="account-stats-grid__value">{stat.value}</span>
          <span className="account-stats-grid__label">{stat.label}</span>
        </article>
      ))}
    </section>
  )
}
