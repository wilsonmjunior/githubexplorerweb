import type { GitHubRepoSummaryDto } from '@/core/domain/github'
import type {
  ProfileRepoSortOption,
  ProfileRepoTypeFilter,
} from '@/core/presentation/profile/hooks/useGithubProfile'
import { RepositoryListCard } from '@/core/presentation/profile/components/RepositoryListCard'
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
  { value: 'all', label: 'TYPE: ALL' },
  { value: 'sources', label: 'TYPE: SOURCES' },
  { value: 'forks', label: 'TYPE: FORKS' },
]

const SORT_OPTIONS: Array<{ value: ProfileRepoSortOption; label: string }> = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Updated' },
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
    TYPE_OPTIONS.find((option) => option.value === typeFilter)?.label ?? 'TYPE: ALL'
  const languageLabel =
    languageFilter === 'all' ? 'LANGUAGE: ALL' : `LANGUAGE: ${languageFilter.toUpperCase()}`
  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ?? 'Stars'

  return (
    <section className="profile-repositories">
      <div className="profile-repositories__controls">
        <div className="profile-repositories__search">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Find a repository..."
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
            SORT: {sortLabel.toUpperCase()}{' '}
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
        <p className="profile-repositories__empty">
          Nenhum repositório encontrado.
        </p>
      ) : null}

      {isLoadingMore ? (
        <div className="profile-repositories__list">
          <RepositoryListSkeleton count={2} variant="mobile" />
        </div>
      ) : null}

      {hasMore ? (
        <div className="profile-repositories__load-more">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="profile-repositories__load-more-btn"
          >
            {isLoadingMore ? 'Carregando...' : 'Load more repositories'}
          </button>
        </div>
      ) : null}
    </section>
  )
}
