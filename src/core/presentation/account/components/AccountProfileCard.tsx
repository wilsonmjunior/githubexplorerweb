import type { AuthenticatedGitHubUserDto } from '@/core/domain/github'
import { Link } from 'react-router-dom'
import { profilePath } from '@/shared/constants/routes'
import { formatCompactNumber } from '@/shared/utils/format-number'
import './AccountProfileCard.css'

type AccountProfileCardProps = {
  user: AuthenticatedGitHubUserDto
}

function formatBlogUrl(blog: string): string {
  return blog.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function formatDate(value: string): string {
  if (!value) {
    return '—'
  }

  return new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function AccountProfileCard({ user }: AccountProfileCardProps) {
  const displayName = user.name ?? user.login

  return (
    <aside className="account-profile-card">
      <img
        src={user.avatarUrl}
        alt={`Avatar de ${displayName}`}
        className="account-profile-card__avatar"
      />

      <div className="account-profile-card__identity">
        <h1 className="account-profile-card__name">{displayName}</h1>
        <span className="account-profile-card__login">@{user.login}</span>
      </div>

      {user.bio ? <p className="account-profile-card__bio">{user.bio}</p> : null}

      <div className="account-profile-card__counts">
        <span>
          <i className="bi bi-people" aria-hidden="true" />
          {formatCompactNumber(user.followers)}{' '}
          <span className="account-profile-card__counts-label">followers</span>
        </span>
        <span>
          {formatCompactNumber(user.following)}{' '}
          <span className="account-profile-card__counts-label">following</span>
        </span>
      </div>

      <div className="account-profile-card__meta">
        {user.email ? (
          <div className="account-profile-card__meta-item">
            <i className="bi bi-envelope" aria-hidden="true" />
            <span>{user.email}</span>
          </div>
        ) : null}
        {user.location ? (
          <div className="account-profile-card__meta-item">
            <i className="bi bi-geo-alt" aria-hidden="true" />
            <span>{user.location}</span>
          </div>
        ) : null}
        {user.company ? (
          <div className="account-profile-card__meta-item">
            <i className="bi bi-building" aria-hidden="true" />
            <span>{user.company}</span>
          </div>
        ) : null}
        {user.blog ? (
          <div className="account-profile-card__meta-item">
            <i className="bi bi-link-45deg" aria-hidden="true" />
            <a href={user.blog} target="_blank" rel="noreferrer">
              {formatBlogUrl(user.blog)}
            </a>
          </div>
        ) : null}
        {user.twitterUsername ? (
          <div className="account-profile-card__meta-item">
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
        <div className="account-profile-card__meta-item">
          <i className="bi bi-calendar3" aria-hidden="true" />
          <span>Membro desde {formatDate(user.createdAt)}</span>
        </div>
      </div>

      <div className="account-profile-card__actions">
        <Link to={profilePath(user.login)} className="account-profile-card__action">
          Ver perfil público
        </Link>
        <a
          href={user.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="account-profile-card__action account-profile-card__action--secondary"
        >
          Abrir no GitHub
        </a>
      </div>
    </aside>
  )
}
