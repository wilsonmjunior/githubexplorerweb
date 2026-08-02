import { useId, useState } from 'react'
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
  totalCount: number
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
  { value: 'all', label: 'Todos' },
  { value: 'sources', label: 'Originais' },
  { value: 'forks', label: 'Forks' },
]

const MOBILE_TYPE_OPTIONS: Array<{ value: ProfileRepoTypeFilter; label: string }> =
  [
    { value: 'all', label: 'TIPO: TODOS' },
    { value: 'sources', label: 'TIPO: ORIGINAIS' },
    { value: 'forks', label: 'TIPO: FORKS' },
  ]

const SORT_OPTIONS: Array<{ value: ProfileRepoSortOption; label: string }> = [
  { value: 'stars', label: 'Estrelas' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Atualizado' },
]

type DropdownKey = 'type' | 'language' | 'sort' | null

export function ProfileRepositoriesSection({
  repositories,
  totalCount,
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
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const typeMenuId = useId()
  const languageMenuId = useId()
  const sortMenuId = useId()

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((current) => (current === key ? null : key))
  }

  const nextTypeFilter = () => {
    const currentIndex = MOBILE_TYPE_OPTIONS.findIndex(
      (option) => option.value === typeFilter,
    )
    const nextIndex = (currentIndex + 1) % MOBILE_TYPE_OPTIONS.length
    onTypeFilterChange(MOBILE_TYPE_OPTIONS[nextIndex].value)
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
    TYPE_OPTIONS.find((option) => option.value === typeFilter)?.label ?? 'Todos'
  const mobileTypeLabel =
    MOBILE_TYPE_OPTIONS.find((option) => option.value === typeFilter)?.label ??
    'TIPO: TODOS'
  const languageLabel =
    languageFilter === 'all' ? 'Todas' : languageFilter
  const mobileLanguageLabel =
    languageFilter === 'all'
      ? 'LINGUAGEM: TODAS'
      : `LINGUAGEM: ${languageFilter.toUpperCase()}`
  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ?? 'Estrelas'

  return (
    <section className="profile-repositories">
      <div className="profile-repositories__header">
        <h2 className="profile-repositories__title">
          Repositórios{' '}
          <span className="profile-repositories__count">({totalCount})</span>
        </h2>
      </div>

      <div className="profile-repositories__controls">
        <div className="profile-repositories__search">
          <label className="visually-hidden" htmlFor="profile-repo-search">
            Buscar repositório
          </label>
          <i className="bi bi-search" aria-hidden="true" />
          <input
            id="profile-repo-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Encontrar um repositório..."
          />
          {isSearching ? (
            <span
              className="profile-repositories__search-indicator"
              role="status"
              aria-label="Buscando"
            />
          ) : null}
        </div>

        <div className="profile-repositories__filters profile-repositories__filters--mobile">
          <div className="profile-repositories__chips">
            <button
              type="button"
              className="profile-repositories__chip"
              onClick={nextTypeFilter}
              aria-label={`Alterar filtro de tipo. Atual: ${typeLabel}`}
            >
              {mobileTypeLabel}
            </button>
            <button
              type="button"
              className="profile-repositories__chip"
              onClick={nextLanguageFilter}
              aria-label={`Alterar filtro de linguagem. Atual: ${languageLabel}`}
            >
              {mobileLanguageLabel}
            </button>
          </div>
          <button
            type="button"
            className="profile-repositories__sort"
            onClick={nextSort}
            aria-label={`Alterar ordenação. Atual: ${sortLabel}`}
          >
            ORDENAR: {sortLabel.toUpperCase()}{' '}
            <i className="bi bi-chevron-down" aria-hidden="true" />
          </button>
        </div>

        <div className="profile-repositories__filters profile-repositories__filters--desktop">
          <div className="profile-repositories__dropdown-wrap">
            <button
              type="button"
              className="profile-repositories__filter-btn"
              onClick={() => toggleDropdown('type')}
              aria-expanded={openDropdown === 'type'}
              aria-haspopup="listbox"
              aria-controls={typeMenuId}
            >
              Tipo: <strong>{typeLabel}</strong>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>

            {openDropdown === 'type' ? (
              <div
                id={typeMenuId}
                className="profile-repositories__dropdown-menu"
                role="listbox"
                aria-label="Filtrar por tipo"
              >
                {TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="profile-repositories__dropdown-option"
                    role="option"
                    aria-selected={typeFilter === option.value}
                    onClick={() => {
                      onTypeFilterChange(option.value)
                      setOpenDropdown(null)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="profile-repositories__dropdown-wrap">
            <button
              type="button"
              className="profile-repositories__filter-btn"
              onClick={() => toggleDropdown('language')}
              aria-expanded={openDropdown === 'language'}
              aria-haspopup="listbox"
              aria-controls={languageMenuId}
            >
              Linguagem: <strong>{languageLabel}</strong>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>

            {openDropdown === 'language' ? (
              <div
                id={languageMenuId}
                className="profile-repositories__dropdown-menu"
                role="listbox"
                aria-label="Filtrar por linguagem"
              >
                <button
                  type="button"
                  className="profile-repositories__dropdown-option"
                  role="option"
                  aria-selected={languageFilter === 'all'}
                  onClick={() => {
                    onLanguageFilterChange('all')
                    setOpenDropdown(null)
                  }}
                >
                  Todas
                </button>
                {availableLanguages.map((language) => (
                  <button
                    key={language}
                    type="button"
                    className="profile-repositories__dropdown-option"
                    role="option"
                    aria-selected={languageFilter === language}
                    onClick={() => {
                      onLanguageFilterChange(language)
                      setOpenDropdown(null)
                    }}
                  >
                    {language}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="profile-repositories__dropdown-wrap">
            <button
              type="button"
              className="profile-repositories__filter-btn"
              onClick={() => toggleDropdown('sort')}
              aria-expanded={openDropdown === 'sort'}
              aria-haspopup="listbox"
              aria-controls={sortMenuId}
            >
              Ordenar: <strong>{sortLabel}</strong>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>

            {openDropdown === 'sort' ? (
              <div
                id={sortMenuId}
                className="profile-repositories__dropdown-menu"
                role="listbox"
                aria-label="Ordenar repositórios"
              >
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="profile-repositories__dropdown-option"
                    role="option"
                    aria-selected={sortBy === option.value}
                    onClick={() => {
                      onSortChange(option.value)
                      setOpenDropdown(null)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="profile-repositories__list">
        {isSearching ? (
          <RepositoryListSkeleton count={4} />
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
          <RepositoryListSkeleton count={2} />
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
