import type { RepositoryContributorDto } from '@/core/domain/github'
import './RepositoryMaintainersCard.css'

type RepositoryMaintainersCardProps = {
  contributors: RepositoryContributorDto[]
}

export function RepositoryMaintainersCard({
  contributors,
}: RepositoryMaintainersCardProps) {
  const visibleContributors = contributors.slice(0, 3)
  const remainingCount = Math.max(contributors.length - 3, 0)

  return (
    <section className="repository-maintainers glass-card">
      <h2 className="repository-maintainers__title">Maintainers</h2>
      <div className="repository-maintainers__avatars">
        {visibleContributors.map((contributor) => (
          <a
            key={contributor.login}
            href={contributor.htmlUrl}
            target="_blank"
            rel="noreferrer"
            title={contributor.login}
          >
            <img
              src={contributor.avatarUrl}
              alt={`Avatar de ${contributor.login}`}
            />
          </a>
        ))}
        {remainingCount > 0 ? (
          <span className="repository-maintainers__more">+{remainingCount}</span>
        ) : null}
      </div>
    </section>
  )
}
