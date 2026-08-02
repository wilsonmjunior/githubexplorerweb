import { useState } from 'react'
import type { GitHubRepoSummaryDto } from '@/core/domain/github'
import type {
  ProfileRepoSortOption,
  ProfileRepoTypeFilter,
} from '@/core/presentation/profile/hooks/useGithubProfile'
import { EmptyState } from '@/shared/components/EmptyState'
import { LoadMoreButton } from '@/shared/components/LoadMoreButton'
import { RepositoryListCard } from '@/shared/components/RepositoryListCard'
import { RepositoryListSkeleton } from '@/shared/components/skeletons/RepositoryListSkeleton'
import './ProfileRepositoriesDesktop.css'

type ProfileRepositoriesDesktopProps = {
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

const SORT_OPTIONS: Array<{ value: ProfileRepoSortOption; label: string }> = [
  { value: 'stars', label: 'Estrelas' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Atualizado' },
]

type DropdownKey = 'type' | 'language' | 'sort' | null

export function ProfileRepositoriesDesktop({
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
}: ProfileRepositoriesDesktopProps) {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((current) => (current === key ? null : key))
  }

  const typeLabel =
    TYPE_OPTIONS.find((option) => option.value === typeFilter)?.label ?? 'Todos'
  const languageLabel =
    languageFilter === 'all' ? 'Todas' : languageFilter
  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ?? 'Estrelas'

  return (
    <section className="profile-repositories-desktop">
      <div className="profile-repositories-desktop__header">
        <h2 className="profile-repositories-desktop__title">
          Repositórios{' '}
          <span className="profile-repositories-desktop__count">
            ({totalCount})
          </span>
        </h2>
      </div>

      <div className="profile-repositories-desktop__controls">
        <div className="profile-repositories-desktop__search">
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
              className="profile-repositories-desktop__search-indicator"
              role="status"
              aria-label="Buscando"
            />
          ) : null}
        </div>

        <div className="profile-repositories-desktop__filters">
          <div className="profile-repositories-desktop__dropdown-wrap">
            <button
              type="button"
              className="profile-repositories-desktop__filter-btn"
              onClick={() => toggleDropdown('type')}
            >
              Tipo: <strong>{typeLabel}</strong>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>

            {openDropdown === 'type' ? (
              <div className="profile-repositories-desktop__dropdown-menu">
                {TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="profile-repositories-desktop__dropdown-option"
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

          <div className="profile-repositories-desktop__dropdown-wrap">
            <button
              type="button"
              className="profile-repositories-desktop__filter-btn"
              onClick={() => toggleDropdown('language')}
            >
              Linguagem: <strong>{languageLabel}</strong>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>

            {openDropdown === 'language' ? (
              <div className="profile-repositories-desktop__dropdown-menu">
                <button
                  type="button"
                  className="profile-repositories-desktop__dropdown-option"
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
                    className="profile-repositories-desktop__dropdown-option"
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

          <div className="profile-repositories-desktop__dropdown-wrap">
            <button
              type="button"
              className="profile-repositories-desktop__filter-btn"
              onClick={() => toggleDropdown('sort')}
            >
              Ordenar: <strong>{sortLabel}</strong>
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>

            {openDropdown === 'sort' ? (
              <div className="profile-repositories-desktop__dropdown-menu">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="profile-repositories-desktop__dropdown-option"
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

      <div className="profile-repositories-desktop__list">
        {isSearching ? (
          <RepositoryListSkeleton count={6} variant="mobile" />
        ) : (
          repositories.map((repository) => (
            <RepositoryListCard
              key={repository.id}
              repository={repository}
              variant="desktop"
            />
          ))
        )}
      </div>

      {repositories.length === 0 && !isSearching ? (
        <EmptyState message="Nenhum repositório encontrado." />
      ) : null}

      {isLoadingMore ? (
        <div className="profile-repositories-desktop__load-more-skeleton">
          <RepositoryListSkeleton count={3} variant="mobile" />
        </div>
      ) : null}

      {hasMore ? (
        <div className="profile-repositories-desktop__load-more">
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
