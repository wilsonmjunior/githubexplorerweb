import type { GitHubRepositoryDto } from '@/core/domain/github'
import './RepositoryTagsCard.css'

type RepositoryTagsCardProps = {
  repository: GitHubRepositoryDto
}

export function RepositoryTagsCard({ repository }: RepositoryTagsCardProps) {
  const tags = [
    repository.defaultBranch,
    repository.license,
    ...repository.topics.slice(0, 2),
  ].filter((tag): tag is string => Boolean(tag))

  return (
    <section className="repository-tags glass-card">
      <h2 className="repository-tags__title">Tags rápidas</h2>
      <div className="repository-tags__list">
        {tags.map((tag) => (
          <span key={tag} className="repository-tags__tag">
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
