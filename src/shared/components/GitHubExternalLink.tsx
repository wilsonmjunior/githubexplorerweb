import './GitHubExternalLink.css'

type GitHubExternalLinkProps = {
  href: string
  label?: string
  variant?: 'primary' | 'outline' | 'mobile'
  icon?: string
  className?: string
}

export function GitHubExternalLink({
  href,
  label = 'Ver no GitHub',
  variant = 'primary',
  icon = 'bi-box-arrow-up-right',
  className = '',
}: GitHubExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`github-external-link github-external-link--${variant} ${className}`.trim()}
    >
      <i className={`bi ${icon}`} aria-hidden="true" />
      {variant === 'primary' ? (
        <>
          <span className="d-none d-sm-inline">{label}</span>
          <span className="d-sm-none">GitHub</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </a>
  )
}
