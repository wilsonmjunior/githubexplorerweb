import type { GitHubUserDto } from '@/core/domain/github'
import { formatCompactNumber } from '@/shared/utils/format-number'
import './ProfileSidebar.css'

type ProfileSidebarProps = {
  user: GitHubUserDto
}

function formatBlogUrl(blog: string): string {
  return blog.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  const displayName = user.name ?? user.login

  return (
    <aside className="profile-sidebar">
      <img
        src={user.avatarUrl}
        alt={`Avatar de ${displayName}`}
        className="profile-sidebar__avatar"
      />

      <div className="profile-sidebar__identity">
        <h1 className="profile-sidebar__name">{displayName}</h1>
        <span className="profile-sidebar__login">@{user.login}</span>
      </div>

      {user.bio ? <p className="profile-sidebar__bio">{user.bio}</p> : null}

      <div className="profile-sidebar__counts">
        <span>
          <i className="bi bi-people" aria-hidden="true" />
          {formatCompactNumber(user.followers)}{' '}
          <span className="profile-sidebar__counts-label">followers</span>
        </span>
        <span>
          {formatCompactNumber(user.following)}{' '}
          <span className="profile-sidebar__counts-label">following</span>
        </span>
      </div>

      <div className="profile-sidebar__meta">
        {user.location ? (
          <div className="profile-sidebar__meta-item">
            <i className="bi bi-geo-alt" aria-hidden="true" />
            <span>{user.location}</span>
          </div>
        ) : null}
        {user.blog ? (
          <div className="profile-sidebar__meta-item">
            <i className="bi bi-link-45deg" aria-hidden="true" />
            <a href={user.blog} target="_blank" rel="noreferrer">
              {formatBlogUrl(user.blog)}
            </a>
          </div>
        ) : null}
        {user.company ? (
          <div className="profile-sidebar__meta-item">
            <i className="bi bi-building" aria-hidden="true" />
            <span>{user.company}</span>
          </div>
        ) : null}
      </div>
    </aside>
  )
}
