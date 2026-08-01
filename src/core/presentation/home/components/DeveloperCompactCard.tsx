import type { GitHubUserDto } from '@/core/domain/github'
import { Link } from 'react-router-dom'
import { extractTagsFromBio } from '@/core/presentation/home/utils/extract-tags'
import { FollowingTag } from '@/shared/components/FollowingTag'
import { profilePath } from '@/shared/constants/routes'
import { useGithubAuth } from '@/shared/providers/GithubAuthProvider'
import { getDisplayName } from '@/shared/utils/get-display-name'
import './DeveloperCompactCard.css'

type DeveloperCompactCardProps = {
  developer: GitHubUserDto
}

export function DeveloperCompactCard({ developer }: DeveloperCompactCardProps) {
  const { isFollowing } = useGithubAuth()
  const displayName = getDisplayName(developer)
  const tags = extractTagsFromBio(developer.bio)
  const isUserFollowing = isFollowing(developer.login)

  return (
    <Link
      to={profilePath(developer.login)}
      className="developer-compact glass-card"
    >
      {isUserFollowing ? (
        <FollowingTag className="following-tag--top-right" />
      ) : null}

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
    </Link>
  )
}
