import { Link } from 'react-router-dom'
import { GITHUB_URL } from '@/shared/constants/github'
import { APP_ROUTES } from '@/shared/constants/routes'
import { useGithubAuth } from '@/shared/providers/GithubAuthProvider'
import './NavbarGitHubButton.css'

type NavbarGitHubButtonProps = {
  className?: string
}

export function NavbarGitHubButton({ className }: NavbarGitHubButtonProps) {
  const { user, isLoading } = useGithubAuth()
  const classNames = `navbar-github-btn ${className ?? ''}`.trim()

  if (isLoading) {
    return (
      <span className={classNames} aria-label="Carregando sessão do GitHub">
        <span
          className="spinner-border spinner-border-sm navbar-github-btn__spinner"
          role="status"
          aria-hidden="true"
        />
      </span>
    )
  }

  if (user) {
    return (
      <Link
        to={APP_ROUTES.ACCOUNT}
        className={classNames}
        aria-label={`Minha conta GitHub — ${user.login}`}
        title={`Minha conta — @${user.login}`}
      >
        <img
          src={user.avatarUrl}
          alt=""
          className="navbar-github-btn__avatar"
        />
      </Link>
    )
  }

  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames}
      aria-label="Ir para o GitHub"
      title="Ir para o GitHub"
    >
      <i className="bi bi-github navbar-github-btn__icon" aria-hidden="true" />
    </a>
  )
}
