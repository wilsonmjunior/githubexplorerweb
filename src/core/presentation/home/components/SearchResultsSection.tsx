import type { GitHubUserDto } from '@/core/domain/github'
import { DeveloperCard } from '@/core/presentation/home/components/DeveloperCard'
import { DeveloperCompactCard } from '@/core/presentation/home/components/DeveloperCompactCard'
import { DeveloperListSkeleton } from '@/shared/components/skeletons/DeveloperListSkeleton'
import './SearchResultsSection.css'

type SearchResultsSectionProps = {
  results: GitHubUserDto[]
  totalCount: number
  isSearching: boolean
  error: string | null
}

export function SearchResultsSection({
  results,
  totalCount,
  isSearching,
  error,
}: SearchResultsSectionProps) {
  return (
    <section className="search-results">
      <div className="search-results__header">
        <h2 className="search-results__title">
          <i className="bi bi-search" aria-hidden="true" />
          Resultados
        </h2>
        {!isSearching && totalCount > 0 ? (
          <span className="search-results__count">
            {totalCount.toLocaleString('pt-BR')} encontrados
          </span>
        ) : null}
      </div>

      {isSearching ? <DeveloperListSkeleton count={6} /> : null}

      {error ? (
        <p className="search-results__state search-results__error">{error}</p>
      ) : null}

      {!isSearching && !error && results.length === 0 ? (
        <p className="search-results__state">Nenhum usuário encontrado.</p>
      ) : null}

      {!isSearching && !error && results.length > 0 ? (
        <>
          <div className="search-results__list d-md-none">
            {results.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
          </div>

          <div className="search-results__grid d-none d-md-grid">
            {results.map((developer) => (
              <DeveloperCompactCard
                key={developer.id}
                developer={developer}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}
