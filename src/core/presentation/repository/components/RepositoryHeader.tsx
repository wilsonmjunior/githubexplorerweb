import type { GitHubRepositoryDto } from '@/core/domain/github'
import './RepositoryHeader.css'

type RepositoryHeaderProps = {
  repository: GitHubRepositoryDto
}

export function RepositoryHeader({ repository }: RepositoryHeaderProps) {
  return (
    <section className="repository-header">
      <div className="repository-header__top">
        <div className="repository-header__title-wrap">
          <i className="bi bi-terminal repository-header__icon" aria-hidden="true" />
          <h1 className="repository-header__title">{repository.name}</h1>
          <span className="repository-header__badge">
            {repository.isPrivate ? 'Private' : 'Public'}
          </span>
        </div>

        <div className="repository-header__actions">
          <a
            href={repository.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="repository-header__github-btn"
          >
            <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
            <span className="d-none d-sm-inline">View on GitHub</span>
            <span className="d-sm-none">GitHub</span>
          </a>
          <button
            type="button"
            className="repository-header__more-btn"
            aria-label="Mais opções"
          >
            <i className="bi bi-three-dots" aria-hidden="true" />
          </button>
        </div>
      </div>

      {repository.description ? (
        <p className="repository-header__description">{repository.description}</p>
      ) : null}
    </section>
  )
}
