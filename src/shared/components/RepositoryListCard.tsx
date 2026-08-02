import type { GitHubRepoSummaryDto } from '@/core/domain/github'
import { Link } from 'react-router-dom'
import { formatCompactNumber } from '@/shared/utils/format-number'
import { formatRelativeTime } from '@/shared/utils/format-relative-time'
import { repositoryPath } from '@/shared/constants/routes'
import './RepositoryListCard.css'

type RepositoryListCardProps = {
  repository: GitHubRepoSummaryDto
}

export function RepositoryListCard({ repository }: RepositoryListCardProps) {
  const [owner, name] = repository.fullName.split('/')

  return (
    <Link
      to={repositoryPath(owner, name)}
      className="repository-list-card"
    >
      <div className="repository-list-card__header">
        <span className="repository-list-card__name">{repository.name}</span>
        <span className="repository-list-card__badge">
          {repository.isPrivate ? 'PRIVADO' : 'PÚBLICO'}
        </span>
      </div>

      {repository.description ? (
        <p className="repository-list-card__description">
          {repository.description}
        </p>
      ) : null}

      <div className="repository-list-card__meta">
        {repository.language ? (
          <span className="repository-list-card__language">
            <span className="repository-list-card__dot" />
            {repository.language}
          </span>
        ) : null}
        <span className="repository-list-card__stat">
          <i className="bi bi-star-fill" aria-hidden="true" />
          {formatCompactNumber(repository.stargazersCount)}
        </span>
        <span className="repository-list-card__stat">
          <i className="bi bi-diagram-3" aria-hidden="true" />
          {formatCompactNumber(repository.forksCount)}
        </span>
        {repository.license ? (
          <span className="repository-list-card__license">
            {repository.license}
          </span>
        ) : null}
        {repository.pushedAt ? (
          <span className="repository-list-card__updated">
            Atualizado {formatRelativeTime(repository.pushedAt)}
          </span>
        ) : null}
      </div>
    </Link>
  )
}
