import type { GitHubRepositoryDto } from '@/core/domain/github'
import './RepositoryMobileHero.css'

const ACTIVE_TAG = 'Ativo'

type RepositoryMobileHeroProps = {
  repository: GitHubRepositoryDto
}

export function RepositoryMobileHero({ repository }: RepositoryMobileHeroProps) {
  const tags = [
    repository.defaultBranch,
    repository.license,
    repository.pushedAt ? ACTIVE_TAG : null,
  ].filter((tag): tag is string => Boolean(tag))

  return (
    <section className="repository-mobile-hero">
      <div className="repository-mobile-hero__owner">
        <i className="bi bi-folder2-open" aria-hidden="true" />
        <span>{repository.owner.login} /</span>
      </div>

      <h1 className="repository-mobile-hero__title">{repository.name}</h1>

      {repository.description ? (
        <p className="repository-mobile-hero__description">
          {repository.description}
        </p>
      ) : null}

      {tags.length > 0 ? (
        <div className="repository-mobile-hero__tags">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className={`repository-mobile-hero__tag ${
                index === tags.length - 1 && tag === ACTIVE_TAG
                  ? 'repository-mobile-hero__tag--active'
                  : ''
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  )
}
