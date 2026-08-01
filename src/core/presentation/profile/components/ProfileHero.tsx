import type { GitHubUserDto } from '@/core/domain/github'
import { formatCompactNumber } from '@/shared/utils/format-number'
import { FollowingTag } from '@/shared/components/FollowingTag'
import { useGithubAuth } from '@/shared/providers/GithubAuthProvider'
import './ProfileHero.css'

type ProfileHeroProps = {
  user: GitHubUserDto
}

export function ProfileHero({ user }: ProfileHeroProps) {
  const { isFollowing } = useGithubAuth()
  const displayName = user.name ?? user.login
  const isUserFollowing = isFollowing(user.login)

  return (
    <section className="profile-hero text-center">
      {isUserFollowing ? (
        <FollowingTag className="following-tag--top-right" />
      ) : null}

      <div className="profile-hero__content">
        <div className="profile-hero__avatar-wrap">
          <img
            src={user.avatarUrl}
            alt={`Avatar de ${displayName}`}
            className="profile-hero__avatar"
          />
          <span className="profile-hero__verified" aria-label="Verificado">
            <i className="bi bi-patch-check-fill" aria-hidden="true" />
          </span>
        </div>

        <div className="profile-hero__identity">
          <h1 className="profile-hero__name">{displayName}</h1>
          <p className="profile-hero__login">{user.login}</p>
        </div>

        {user.bio ? (
          <p className="profile-hero__bio">{user.bio}</p>
        ) : null}

        <div className="profile-hero__stats">
          <div>
            <span className="profile-hero__stat-value">
              {formatCompactNumber(user.followers)}
            </span>
            <span className="profile-hero__stat-label">FOLLOWERS</span>
          </div>
          <div>
            <span className="profile-hero__stat-value">
              {formatCompactNumber(user.following)}
            </span>
            <span className="profile-hero__stat-label">FOLLOWING</span>
          </div>
          <div>
            <span className="profile-hero__stat-value">
              {formatCompactNumber(user.publicRepos)}
            </span>
            <span className="profile-hero__stat-label">REPOS</span>
          </div>
        </div>
      </div>
    </section>
  )
}
