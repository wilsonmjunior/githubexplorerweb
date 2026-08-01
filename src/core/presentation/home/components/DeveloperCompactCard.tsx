import type { GitHubUserDto } from '@/core/domain/github'
import { Link } from 'react-router-dom'
import { profilePath } from '@/shared/constants/routes'
import { extractTagsFromBio } from '@/core/presentation/home/utils/extract-tags'
import './DeveloperCompactCard.css'

type DeveloperCompactCardProps = {
  developer: GitHubUserDto
}

export function DeveloperCompactCard({ developer }: DeveloperCompactCardProps) {
  const displayName = developer.name ?? developer.login
  const tags = extractTagsFromBio(developer.bio)

  return (
    <article className="developer-compact glass-card">
      <img
        src={developer.avatarUrl}
        alt={`Avatar de ${displayName}`}
        className="developer-compact__avatar"
      />

      <h4 className="developer-compact__name">{displayName}</h4>
      <p className="developer-compact__handle">@{developer.login}</p>

      {tags.length > 0 ? (
        <div className="developer-compact__tags">
          {tags.map((tag) => (
            <span key={tag} className="developer-compact__tag">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="developer-compact__footer">
        <Link
          to={profilePath(developer.login)}
          className="developer-compact__follow"
        >
          FOLLOW
        </Link>
      </div>
    </article>
  )
}
