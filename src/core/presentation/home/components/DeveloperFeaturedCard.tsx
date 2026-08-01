import type { GitHubUserDto } from '@/core/domain/github'
import { Link } from 'react-router-dom'
import { formatCompactNumber } from '@/shared/utils/format-number'
import { FollowingTag } from '@/shared/components/FollowingTag'
import { profilePath } from '@/shared/constants/routes'
import { useGithubAuth } from '@/shared/providers/GithubAuthProvider'
import './DeveloperFeaturedCard.css'

type DeveloperFeaturedCardProps = {
  developer: GitHubUserDto
}

export function DeveloperFeaturedCard({ developer }: DeveloperFeaturedCardProps) {
  const { isFollowing } = useGithubAuth()
  const displayName = developer.name ?? developer.login
  const isUserFollowing = isFollowing(developer.login)

  return (
    <Link
      to={profilePath(developer.login)}
      className="developer-featured glass-card"
    >
      <div className="developer-featured__glow" aria-hidden="true" />

      {isUserFollowing ? (
        <FollowingTag className="following-tag--top-right" />
      ) : null}

      <img
        src={developer.avatarUrl}
        alt={`Avatar de ${displayName}`}
        className="developer-featured__avatar"
      />

      <div className="developer-featured__body">
        <h3 className="developer-featured__name">{displayName}</h3>
        <p className="developer-featured__handle">@{developer.login}</p>
        <p className="developer-featured__bio">
          {developer.bio ??
            'Leading architecture for distributed systems and open-source enthusiast.'}
        </p>
      </div>

      <div className="developer-featured__stats">
        <div>
          <span className="developer-featured__stat-label">REPOS</span>
          <span className="developer-featured__stat-value">
            {formatCompactNumber(developer.publicRepos)}
          </span>
        </div>
        <div>
          <span className="developer-featured__stat-label">STARS</span>
          <span className="developer-featured__stat-value">
            {formatCompactNumber(developer.publicGists)}
          </span>
        </div>
        <div>
          <span className="developer-featured__stat-label">FOLLOWERS</span>
          <span className="developer-featured__stat-value">
            {formatCompactNumber(developer.followers)}
          </span>
        </div>
      </div>
    </Link>
  )
}
