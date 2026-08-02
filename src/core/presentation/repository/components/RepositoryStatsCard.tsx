import type { GitHubRepositoryDto } from '@/core/domain/github'
import type { RepositoryLanguageDto } from '@/core/domain/github'
import { LanguageDistributionBar } from '@/shared/components/LanguageDistributionBar'
import { StatsGrid } from '@/shared/components/StatsGrid'
import { formatCompactNumber } from '@/shared/utils/format-number'
import './RepositoryStatsCard.css'

type RepositoryStatsCardProps = {
  repository: GitHubRepositoryDto
  languages: RepositoryLanguageDto[]
}

export function RepositoryStatsCard({
  repository,
  languages,
}: RepositoryStatsCardProps) {
  const statsItems = [
    {
      label: 'Estrelas',
      value: formatCompactNumber(repository.stargazersCount),
      icon: 'bi-star',
      iconVariant: 'tertiary' as const,
    },
    {
      label: 'Forks',
      value: formatCompactNumber(repository.forksCount),
      icon: 'bi-diagram-3',
      iconVariant: 'primary' as const,
    },
    {
      label: 'Observadores',
      value: formatCompactNumber(repository.watchersCount),
      icon: 'bi-eye',
      iconVariant: 'secondary' as const,
    },
    {
      label: 'Issues',
      value: formatCompactNumber(repository.openIssuesCount),
      icon: 'bi-exclamation-circle',
      iconVariant: 'error' as const,
    },
  ]

  return (
    <section className="repository-stats glass-card">
      <StatsGrid
        variant="mobile"
        className="repository-stats__grid repository-stats__grid--mobile"
        items={statsItems.map((item) => ({
          ...item,
          icon:
            item.label === 'Estrelas' ? 'bi-star-fill' : item.icon,
        }))}
      />

      <StatsGrid
        variant="bordered"
        className="repository-stats__grid repository-stats__grid--desktop"
        title="Estatísticas do repositório"
        items={statsItems}
      />

      {languages.length > 0 ? (
        <div className="repository-stats__languages">
          <LanguageDistributionBar
            languages={languages}
            variant="list"
            title="Linguagens"
            className="repository-stats__languages--mobile"
          />
          <LanguageDistributionBar
            languages={languages}
            variant="legend"
            title="Distribuição de linguagens"
            className="repository-stats__languages--desktop"
          />
        </div>
      ) : null}
    </section>
  )
}
