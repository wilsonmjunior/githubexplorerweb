import type { GitHubRepoSummaryDto } from '@/core/domain/github'
import type {
  ProfileRepoSortOption,
  ProfileRepoTypeFilter,
} from '@/core/presentation/profile/hooks/useGithubProfile'
import { EmptyState } from '@/shared/components/EmptyState'
import { LoadMoreButton } from '@/shared/components/LoadMoreButton'
import { RepositoryListCard } from '@/shared/components/RepositoryListCard'
import { RepositoryListSkeleton } from '@/shared/components/skeletons/RepositoryListSkeleton'
import './ProfileRepositoriesSection.css'

type ProfileRepositoriesSectionProps = {
  repositories: GitHubRepoSummaryDto[]
  searchQuery: string
  onSearchChange: (value: string) => void
  typeFilter: ProfileRepoTypeFilter
  onTypeFilterChange: (value: ProfileRepoTypeFilter) => void
  languageFilter: string
  onLanguageFilterChange: (value: string) => void
  availableLanguages: string[]
  sortBy: ProfileRepoSortOption
  onSortChange: (value: ProfileRepoSortOption) => void
  isSearching: boolean
  isLoadingMore: boolean
  hasMore: boolean
  onLoadMore: () => void
}

const TYPE_OPTIONS: Array<{ value: ProfileRepoTypeFilter; label: string }> = [
  { value: 'all', label: 'TIPO: TODOS' },
  { value: 'sources', label: 'TIPO: ORIGINAIS' },
  { value: 'forks', label: 'TIPO: FORKS' },
]

const SORT_OPTIONS: Array<{ value: ProfileRepoSortOption; label: string }> = [
  { value: 'stars', label: 'Estrelas' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Atualizado' },
]

export function ProfileRepositoriesSection({
  repositories,
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  languageFilter,
  onLanguageFilterChange,
  availableLanguages,
  sortBy,
  onSortChange,
  isSearching,
  isLoadingMore,
  hasMore,
  onLoadMore,
}: ProfileRepositoriesSectionProps) {
  const nextTypeFilter = () => {
    const currentIndex = TYPE_OPTIONS.findIndex((option) => option.value === typeFilter)
    const nextIndex = (currentIndex + 1) % TYPE_OPTIONS.length
    onTypeFilterChange(TYPE_OPTIONS[nextIndex].value)
  }

  const nextLanguageFilter = () => {
    const options = ['all', ...availableLanguages]
    const currentIndex = options.indexOf(languageFilter)
    const nextIndex = (currentIndex + 1) % options.length
    onLanguageFilterChange(options[nextIndex])
  }

  const nextSort = () => {
    const currentIndex = SORT_OPTIONS.findIndex((option) => option.value === sortBy)
    const nextIndex = (currentIndex + 1) % SORT_OPTIONS.length
    onSortChange(SORT_OPTIONS[nextIndex].value)
  }

  const typeLabel =
    TYPE_OPTIONS.find((option) => option.value === typeFilter)?.label ?? 'TIPO: TODOS'
  const languageLabel =
    languageFilter === 'all' ? 'LINGUAGEM: TODAS' : `LINGUAGEM: ${languageFilter.toUpperCase()}`
  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ?? 'Estrelas'

  return (
    <section className="profile-repositories">
      <div className="profile-repositories__controls">
        <div className="profile-repositories__search">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Encontrar um repositório..."
            aria-label="Buscar repositório"
          />
          {isSearching ? (
            <span
              className="profile-repositories__search-indicator"
              role="status"
              aria-label="Buscando"
            />
          ) : null}
        </div>

        <div className="profile-repositories__filters">
          <div className="profile-repositories__chips">
            <button
              type="button"
              className="profile-repositories__chip"
              onClick={nextTypeFilter}
            >
              {typeLabel}
            </button>
            <button
              type="button"
              className="profile-repositories__chip"
              onClick={nextLanguageFilter}
            >
              {languageLabel}
            </button>
          </div>
          <button type="button" className="profile-repositories__sort" onClick={nextSort}>
            ORDENAR: {sortLabel.toUpperCase()}{' '}
            <i className="bi bi-chevron-down" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="profile-repositories__list">
        {isSearching ? (
          <RepositoryListSkeleton count={4} variant="mobile" />
        ) : (
          repositories.map((repository) => (
            <RepositoryListCard key={repository.id} repository={repository} />
          ))
        )}
      </div>

      {repositories.length === 0 && !isSearching ? (
        <EmptyState message="Nenhum repositório encontrado." />
      ) : null}

      {isLoadingMore ? (
        <div className="profile-repositories__load-more-skeleton">
          <RepositoryListSkeleton count={2} variant="mobile" />
        </div>
      ) : null}

      {hasMore ? (
        <div className="profile-repositories__load-more">
          <LoadMoreButton
            onClick={onLoadMore}
            isLoading={isLoadingMore}
            label="Carregar mais repositórios"
          />
        </div>
      ) : null}
    </section>
  )
}
