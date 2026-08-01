import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { GitHubRepoSummaryDto } from '@/core/domain/github'
import { useGithubRepositorySearch } from '@/shared/hooks/useGithubRepositorySearch'
import { repositoryPath } from '@/shared/constants/routes'
import './HeaderRepositorySearch.css'

type HeaderRepositorySearchProps = {
  className?: string
}

export function HeaderRepositorySearch({ className }: HeaderRepositorySearchProps) {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const { query, setQuery, results, isSearching, error, hasActiveSearch } =
    useGithubRepositorySearch({ perPage: 5, sort: 'stars' })
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (repository: GitHubRepoSummaryDto) => {
    const [owner, name] = repository.fullName.split('/')
    navigate(repositoryPath(owner, name))
    setQuery('')
    setIsOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && results[0]) {
      handleSelect(results[0])
    }

    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showDropdown =
    isOpen && (isSearching || error !== null || (hasActiveSearch && results.length > 0))

  return (
    <div
      ref={containerRef}
      className={`header-repo-search ${className ?? ''}`}
    >
      <i className="bi bi-search" aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Buscar repositórios..."
        aria-label="Buscar repositórios"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
      />
      {isSearching ? (
        <span
          className="spinner-border spinner-border-sm text-primary header-repo-search__spinner"
          role="status"
          aria-label="Buscando"
        />
      ) : null}

      {showDropdown ? (
        <div className="header-repo-search__dropdown" role="listbox">
          {error ? (
            <p className="header-repo-search__message header-repo-search__message--error">
              {error}
            </p>
          ) : null}

          {!error && isSearching ? (
            <p className="header-repo-search__message">Buscando...</p>
          ) : null}

          {!error && !isSearching && results.length === 0 ? (
            <p className="header-repo-search__message">
              Nenhum repositório encontrado.
            </p>
          ) : null}

          {!error && !isSearching
            ? results.map((repository) => (
                <button
                  key={repository.id}
                  type="button"
                  className="header-repo-search__option"
                  role="option"
                  onClick={() => handleSelect(repository)}
                >
                  <span className="header-repo-search__option-name">
                    {repository.fullName}
                  </span>
                  {repository.description ? (
                    <span className="header-repo-search__option-description">
                      {repository.description}
                    </span>
                  ) : null}
                </button>
              ))
            : null}
        </div>
      ) : null}
    </div>
  )
}
