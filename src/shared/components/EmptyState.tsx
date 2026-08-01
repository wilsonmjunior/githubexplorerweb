import './EmptyState.css'

type EmptyStateProps = {
  message: string
  className?: string
}

export function EmptyState({ message, className = '' }: EmptyStateProps) {
  return (
    <p className={`empty-state ${className}`.trim()}>{message}</p>
  )
}
