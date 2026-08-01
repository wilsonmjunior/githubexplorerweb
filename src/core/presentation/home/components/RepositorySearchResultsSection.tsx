import type { GitHubRepoSummaryDto } from '@/core/domain/github'
import { RepositoryListCard } from '@/core/presentation/profile/components/RepositoryListCard'
import { RepositoryListSkeleton } from '@/shared/components/skeletons/RepositoryListSkeleton'
import './RepositorySearchResultsSection.css'

type RepositorySearchResultsSectionProps = {
  results: GitHubRepoSummaryDto[]
  totalCount: number
  isSearching: boolean
  error: string | null
}

export function RepositorySearchResultsSection({
  results,
  totalCount,
  isSearching,
  error,
}: RepositorySearchResultsSectionProps) {
  return (
    <section className="repository-search-results">
      <div className="repository-search-results__header">
        <h2 className="repository-search-results__title">
          <i className="bi bi-folder2-open" aria-hidden="true" />
          Repositórios
        </h2>
        {!isSearching && totalCount > 0 ? (
          <span className="repository-search-results__count">
            {totalCount.toLocaleString('pt-BR')} encontrados
          </span>
        ) : null}
      </div>

      {isSearching ? <RepositoryListSkeleton count={6} variant="mobile" /> : null}

      {error ? (
        <p className="repository-search-results__state repository-search-results__error">
          {error}
        </p>
      ) : null}

      {!isSearching && !error && results.length === 0 ? (
        <p className="repository-search-results__state">
          Nenhum repositório encontrado.
        </p>
      ) : null}

      {!isSearching && !error && results.length > 0 ? (
        <div className="repository-search-results__list">
          {results.map((repository) => (
            <RepositoryListCard key={repository.id} repository={repository} />
          ))}
        </div>
      ) : null}
    </section>
  )
}
