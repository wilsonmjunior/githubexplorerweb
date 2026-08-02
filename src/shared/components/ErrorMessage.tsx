import './ErrorMessage.css'

type ErrorMessageProps = {
  message: string
  className?: string
}

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <p
      role="alert"
      className={`error-message ${className}`.trim()}
    >
      {message}
    </p>
  )
}
