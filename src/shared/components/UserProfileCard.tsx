import type { GitHubUserDto } from '@/core/domain/github'
import { Link } from 'react-router-dom'
import { FollowingTag } from '@/shared/components/FollowingTag'
import { GitHubExternalLink } from '@/shared/components/GitHubExternalLink'
import { StatsGrid } from '@/shared/components/StatsGrid'
import { profilePath } from '@/shared/constants/routes'
import { useGithubAuth } from '@/shared/providers/GithubAuthProvider'
import { formatBlogUrl } from '@/shared/utils/format-blog-url'
import { formatDateLocale } from '@/shared/utils/format-date-locale'
import { formatCompactNumber } from '@/shared/utils/format-number'
import { getDisplayName } from '@/shared/utils/get-display-name'
import './UserProfileCard.css'

type UserProfileUser = GitHubUserDto & {
  email?: string | null
  twitterUsername?: string | null
  createdAt?: string
}

type UserProfileCardProps = {
  user: UserProfileUser
  variant: 'account' | 'sidebar' | 'hero'
}

export function UserProfileCard({ user, variant }: UserProfileCardProps) {
  const { isFollowing } = useGithubAuth()
  const displayName = getDisplayName(user)
  const isUserFollowing = isFollowing(user.login)

  const rootClassName = [
    'user-profile-card',
    `user-profile-card--${variant}`,
    variant === 'hero' ? 'text-center' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const avatar = (
    <img
      src={user.avatarUrl}
      alt={`Avatar de ${displayName}`}
      className="user-profile-card__avatar"
    />
  )

  const identity = (
    <div className="user-profile-card__identity">
      <h1 className="user-profile-card__name">{displayName}</h1>
      <span className="user-profile-card__login">
        {variant === 'hero' ? user.login : `@${user.login}`}
      </span>
    </div>
  )

  const bio = user.bio ? (
    <p className="user-profile-card__bio">{user.bio}</p>
  ) : null

  const followCounts = (
    <div className="user-profile-card__counts">
      <span>
        {variant !== 'hero' ? (
          <i className="bi bi-people" aria-hidden="true" />
        ) : null}
        {formatCompactNumber(user.followers)}{' '}
        <span className="user-profile-card__counts-label">seguidores</span>
      </span>
      <span>
        {formatCompactNumber(user.following)}{' '}
        <span className="user-profile-card__counts-label">seguindo</span>
      </span>
    </div>
  )

  const metaItems = (
  <>
    {user.email ? (
      <div className="user-profile-card__meta-item">
        <i className="bi bi-envelope" aria-hidden="true" />
        <span>{user.email}</span>
      </div>
    ) : null}
    {user.location ? (
      <div className="user-profile-card__meta-item">
        <i className="bi bi-geo-alt" aria-hidden="true" />
        <span>{user.location}</span>
      </div>
    ) : null}
    {user.company ? (
      <div className="user-profile-card__meta-item">
        <i className="bi bi-building" aria-hidden="true" />
        <span>{user.company}</span>
      </div>
    ) : null}
    {user.blog ? (
      <div className="user-profile-card__meta-item">
        <i className="bi bi-link-45deg" aria-hidden="true" />
        <a href={user.blog} target="_blank" rel="noreferrer">
          {formatBlogUrl(user.blog)}
        </a>
      </div>
    ) : null}
    {user.twitterUsername ? (
      <div className="user-profile-card__meta-item">
        <i className="bi bi-twitter-x" aria-hidden="true" />
        <a
          href={`https://twitter.com/${user.twitterUsername}`}
          target="_blank"
          rel="noreferrer"
        >
          @{user.twitterUsername}
        </a>
      </div>
    ) : null}
    {user.createdAt ? (
      <div className="user-profile-card__meta-item">
        <i className="bi bi-calendar3" aria-hidden="true" />
        <span>Membro desde {formatDateLocale(user.createdAt)}</span>
      </div>
    ) : null}
  </>
  )

  if (variant === 'hero') {
    return (
      <section className={rootClassName}>
        {isUserFollowing ? (
          <FollowingTag className="following-tag--top-right" />
        ) : null}

        <div className="user-profile-card__hero-content">
          <div className="user-profile-card__avatar-wrap">
            {avatar}
            <span className="user-profile-card__verified" aria-label="Verificado">
              <i className="bi bi-patch-check-fill" aria-hidden="true" />
            </span>
          </div>

          {identity}
          {bio}

          <StatsGrid
            variant="hero"
            items={[
              {
                label: 'SEGUIDORES',
                value: formatCompactNumber(user.followers),
              },
              {
                label: 'SEGUINDO',
                value: formatCompactNumber(user.following),
              },
              {
                label: 'REPOS',
                value: formatCompactNumber(user.publicRepos),
              },
            ]}
          />
        </div>
      </section>
    )
  }

  if (variant === 'account') {
    return (
      <aside className={rootClassName}>
        {avatar}
        {identity}
        {bio}
        {followCounts}
        <div className="user-profile-card__meta">{metaItems}</div>
        <div className="user-profile-card__actions">
          <Link to={profilePath(user.login)} className="user-profile-card__action">
            Ver perfil público
          </Link>
          <GitHubExternalLink
            href={user.htmlUrl}
            label="Abrir no GitHub"
            variant="outline"
            className="user-profile-card__action"
          />
        </div>
      </aside>
    )
  }

  return (
    <aside className={rootClassName}>
      {isUserFollowing ? (
        <FollowingTag className="following-tag--top-right" />
      ) : null}

      {avatar}
      {identity}
      {bio}
      {followCounts}
      <div className="user-profile-card__meta">
        {user.location ? (
          <div className="user-profile-card__meta-item">
            <i className="bi bi-geo-alt" aria-hidden="true" />
            <span>{user.location}</span>
          </div>
        ) : null}
        {user.blog ? (
          <div className="user-profile-card__meta-item">
            <i className="bi bi-link-45deg" aria-hidden="true" />
            <a href={user.blog} target="_blank" rel="noreferrer">
              {formatBlogUrl(user.blog)}
            </a>
          </div>
        ) : null}
        {user.company ? (
          <div className="user-profile-card__meta-item">
            <i className="bi bi-building" aria-hidden="true" />
            <span>{user.company}</span>
          </div>
        ) : null}
      </div>
    </aside>
  )
}
