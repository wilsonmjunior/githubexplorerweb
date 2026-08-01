import type { GitHubRepositoryDto } from '@/core/domain/github'
import type { RepositoryLanguageDto } from '@/core/domain/github'
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
      <h2 className="repository-stats__title">Repository Stats</h2>

      <div className="repository-stats__grid">
        <div className="repository-stats__item">
          <i className="bi bi-star repository-stats__icon repository-stats__icon--tertiary" />
          <span className="repository-stats__value">
            {formatCompactNumber(repository.stargazersCount)}
          </span>
          <span className="repository-stats__label">Stars</span>
        </div>
        <div className="repository-stats__item">
          <i className="bi bi-diagram-3 repository-stats__icon repository-stats__icon--primary" />
          <span className="repository-stats__value">
            {formatCompactNumber(repository.forksCount)}
          </span>
          <span className="repository-stats__label">Forks</span>
        </div>
        <div className="repository-stats__item">
          <i className="bi bi-eye repository-stats__icon repository-stats__icon--secondary" />
          <span className="repository-stats__value">
            {formatCompactNumber(repository.watchersCount)}
          </span>
          <span className="repository-stats__label">Watchers</span>
        </div>
        <div className="repository-stats__item">
          <i className="bi bi-exclamation-circle repository-stats__icon repository-stats__icon--error" />
          <span className="repository-stats__value">
            {formatCompactNumber(repository.openIssuesCount)}
          </span>
          <span className="repository-stats__label">Issues</span>
        </div>
      </div>

      {languages.length > 0 ? (
        <div className="repository-stats__languages">
          <h3 className="repository-stats__languages-title">Language Mix</h3>
          <div className="repository-stats__bar">
            {languages.map((language) => (
              <span
                key={language.name}
                className="repository-stats__bar-segment"
                style={{
                  width: `${language.percentage}%`,
                  backgroundColor: language.color,
                }}
              />
            ))}
          </div>
          <div className="repository-stats__legend">
            {languages.map((language) => (
              <span key={language.name} className="repository-stats__legend-item">
                <span
                  className="repository-stats__legend-dot"
                  style={{ backgroundColor: language.color }}
                />
                {language.name} {language.percentage}%
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
