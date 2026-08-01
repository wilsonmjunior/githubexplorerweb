import type { FormEvent } from 'react'
import './SearchBar.css'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  isLoading?: boolean
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Buscar repositórios, tópicos...',
  isLoading = false,
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <>
      <form
        className="search-bar search-bar--mobile search-glow d-md-none"
        onSubmit={handleSubmit}
      >
        <div className="search-bar__field">
          <i className="bi bi-search search-bar__icon" aria-hidden="true" />
          <input
            type="search"
            className="search-bar__input"
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label="Buscar no GitHub"
          />
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm text-primary"
              role="status"
              aria-label="Buscando"
            />
          ) : null}
        </div>
      </form>

      <form
        className="search-bar search-bar--desktop search-glow d-none d-md-block"
        onSubmit={handleSubmit}
      >
        <div className="search-bar__field search-bar__field--desktop">
          <i className="bi bi-search search-bar__icon" aria-hidden="true" />
          <input
            type="search"
            className="search-bar__input search-bar__input--desktop"
            placeholder="Buscar usuários no GitHub..."
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label="Buscar usuários no GitHub"
          />
          <button
            type="submit"
            className="search-bar__submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-label="Buscando"
              />
            ) : (
              'Buscar'
            )}
          </button>
        </div>
      </form>
    </>
  )
}
