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
  return (
    <section className="repository-stats glass-card">
      <StatsGrid
        variant="bordered"
        title="Estatísticas do repositório"
        items={[
          {
            label: 'Estrelas',
            value: formatCompactNumber(repository.stargazersCount),
            icon: 'bi-star',
            iconVariant: 'tertiary',
          },
          {
            label: 'Forks',
            value: formatCompactNumber(repository.forksCount),
            icon: 'bi-diagram-3',
            iconVariant: 'primary',
          },
          {
            label: 'Observadores',
            value: formatCompactNumber(repository.watchersCount),
            icon: 'bi-eye',
            iconVariant: 'secondary',
          },
          {
            label: 'Issues',
            value: formatCompactNumber(repository.openIssuesCount),
            icon: 'bi-exclamation-circle',
            iconVariant: 'error',
          },
        ]}
      />

      {languages.length > 0 ? (
        <div className="repository-stats__languages">
          <LanguageDistributionBar
            languages={languages}
            variant="legend"
            title="Distribuição de linguagens"
          />
        </div>
      ) : null}
    </section>
  )
}
