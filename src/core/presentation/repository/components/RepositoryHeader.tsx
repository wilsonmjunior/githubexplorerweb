import type { GitHubRepositoryDto } from '@/core/domain/github'
import { GitHubExternalLink } from '@/shared/components/GitHubExternalLink'
import './RepositoryHeader.css'

const ACTIVE_TAG = 'Ativo'

type RepositoryHeaderProps = {
  repository: GitHubRepositoryDto
}

export function RepositoryHeader({ repository }: RepositoryHeaderProps) {
  const tags = [
    repository.defaultBranch,
    repository.license,
    repository.pushedAt ? ACTIVE_TAG : null,
  ].filter((tag): tag is string => Boolean(tag))

  return (
    <section className="repository-header">
      <div className="repository-header__owner">
        <i className="bi bi-folder2-open" aria-hidden="true" />
        <span>{repository.owner.login} /</span>
      </div>

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
            className="repository-header__github-btn repository-header__github-btn--desktop"
          />
        </div>
      </div>

      {repository.description ? (
        <p className="repository-header__description">{repository.description}</p>
      ) : null}

      {tags.length > 0 ? (
        <div className="repository-header__tags">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className={`repository-header__tag ${
                index === tags.length - 1 && tag === ACTIVE_TAG
                  ? 'repository-header__tag--active'
                  : ''
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <GitHubExternalLink
        href={repository.htmlUrl}
        icon="bi-terminal"
        className="repository-header__github-btn repository-header__github-btn--mobile"
      />
    </section>
  )
}
