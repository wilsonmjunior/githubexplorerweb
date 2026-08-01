import { GITHUB_URL } from '@/shared/constants/github'
import { useGithubAuth } from '@/shared/providers/GithubAuthProvider'
import './NavbarGitHubButton.css'

type NavbarGitHubButtonProps = {
  className?: string
}

export function NavbarGitHubButton({ className }: NavbarGitHubButtonProps) {
  const { user, isLoading } = useGithubAuth()
  const href = user?.htmlUrl ?? GITHUB_URL
  const label = user
    ? `Perfil GitHub de ${user.login}`
    : 'Ir para o GitHub'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`navbar-github-btn ${className ?? ''}`.trim()}
      aria-label={label}
      title={label}
    >
      {isLoading ? (
        <span
          className="spinner-border spinner-border-sm navbar-github-btn__spinner"
          role="status"
          aria-label="Carregando sessão do GitHub"
        />
      ) : user ? (
        <img
          src={user.avatarUrl}
          alt=""
          className="navbar-github-btn__avatar"
        />
      ) : (
        <i className="bi bi-github navbar-github-btn__icon" aria-hidden="true" />
      )}
    </a>
  )
}
