import './LoadMoreButton.css'

type LoadMoreButtonProps = {
  onClick: () => void
  isLoading: boolean
  label?: string
  loadingLabel?: string
  className?: string
}

export function LoadMoreButton({
  onClick,
  isLoading,
  label = 'Carregar mais',
  loadingLabel = 'Carregando...',
  className = '',
}: LoadMoreButtonProps) {
  return (
    <button
      type="button"
      className={`load-more-btn ${className}`.trim()}
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? loadingLabel : label}
    </button>
  )
}
