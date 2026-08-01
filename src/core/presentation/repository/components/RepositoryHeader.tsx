import type { GitHubRepositoryDto } from '@/core/domain/github'
import { GitHubExternalLink } from '@/shared/components/GitHubExternalLink'
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
            {repository.isPrivate ? 'Privado' : 'Público'}
          </span>
        </div>

        <div className="repository-header__actions">
          <GitHubExternalLink
            href={repository.htmlUrl}
            variant="primary"
            className="repository-header__github-btn"
          />
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
