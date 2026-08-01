import type { GitHubUserDto } from '@/core/domain/github'
import { Link } from 'react-router-dom'
import { profilePath } from '@/shared/constants/routes'
import { formatCompactNumber } from '@/shared/utils/format-number'
import './DeveloperFeaturedCard.css'

type DeveloperFeaturedCardProps = {
  developer: GitHubUserDto
}

export function DeveloperFeaturedCard({ developer }: DeveloperFeaturedCardProps) {
  const displayName = developer.name ?? developer.login

  return (
    <Link
      to={profilePath(developer.login)}
      className="developer-featured glass-card"
    >
      <div className="developer-featured__glow" aria-hidden="true" />

      <div className="developer-featured__top">
        <img
          src={developer.avatarUrl}
          alt={`Avatar de ${displayName}`}
          className="developer-featured__avatar"
        />
        <span className="developer-featured__badge">TOP CONTRIBUTOR</span>
      </div>

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
