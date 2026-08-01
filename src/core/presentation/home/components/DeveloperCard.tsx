import type { GitHubUserDto } from '@/core/domain/github'
import { Link } from 'react-router-dom'
import { formatCompactNumber } from '@/shared/utils/format-number'
import { getDisplayName } from '@/shared/utils/get-display-name'
import { FollowingTag } from '@/shared/components/FollowingTag'
import { profilePath } from '@/shared/constants/routes'
import { useGithubAuth } from '@/shared/providers/GithubAuthProvider'
import './DeveloperCard.css'

type DeveloperCardProps = {
  developer: GitHubUserDto
  rank?: number
}

export function DeveloperCard({ developer, rank }: DeveloperCardProps) {
  const { isFollowing } = useGithubAuth()
  const displayName = getDisplayName(developer)
  const subtitle = developer.bio ?? `@${developer.login}`
  const isUserFollowing = isFollowing(developer.login)

  return (
    <article className="developer-card glass-card">
      {isUserFollowing ? (
        <FollowingTag className="following-tag--top-right" />
      ) : null}

      <div className="developer-card__avatar-wrap">
        <img
          src={developer.avatarUrl}
          alt={`Avatar de ${displayName}`}
          className={`developer-card__avatar ${
            rank === 1 ? 'developer-card__avatar--featured' : ''
          }`}
        />
        {rank !== undefined ? (
          <span
            className={`developer-card__rank ${
              rank === 1 ? 'developer-card__rank--featured' : ''
            }`}
          >
            #{rank}
          </span>
        ) : null}
      </div>

      <div className="developer-card__content">
        <h3 className="developer-card__name">
          <Link to={profilePath(developer.login)} className="developer-card__link">
            {displayName}
          </Link>
        </h3>
        <p className="developer-card__bio">{subtitle}</p>
        <div className="developer-card__stats">
          <span className="developer-card__stat">
            <i className="bi bi-people" aria-hidden="true" />
            {formatCompactNumber(developer.followers)}
          </span>
          <span className="developer-card__stat">
            <i className="bi bi-star" aria-hidden="true" />
            {formatCompactNumber(developer.publicRepos)}
          </span>
        </div>
      </div>
    </article>
  )
}
