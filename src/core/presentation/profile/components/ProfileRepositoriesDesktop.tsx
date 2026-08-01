import { useMemo, useState } from 'react'
import type { GitHubRepoSummaryDto } from '@/core/domain/github'
import type { ProfileRepoSortOption } from '@/core/presentation/profile/hooks/useGithubProfile'
import { RepositoryListCard } from '@/core/presentation/profile/components/RepositoryListCard'
import { RepositoryListSkeleton } from '@/shared/components/skeletons/RepositoryListSkeleton'
import './ProfileRepositoriesDesktop.css'

type ProfileRepositoriesDesktopProps = {
  repositories: GitHubRepoSummaryDto[]
  totalCount: number
  sortBy: ProfileRepoSortOption
  onSortChange: (value: ProfileRepoSortOption) => void
  isSearching: boolean
  isLoadingMore: boolean
  hasMore: boolean
  onLoadMore: () => void
}

const SORT_LABELS: Record<ProfileRepoSortOption, string> = {
  stars: 'Stars',
  forks: 'Forks',
  updated: 'Updated',
}

export function ProfileRepositoriesDesktop({
  repositories,
  totalCount,
  sortBy,
  onSortChange,
  isSearching,
  isLoadingMore,
  hasMore,
  onLoadMore,
}: ProfileRepositoriesDesktopProps) {
  const [isSortOpen, setIsSortOpen] = useState(false)

  const sortedRepositories = useMemo(() => {
    const items = [...repositories]

    items.sort((left, right) => {
      if (sortBy === 'stars') {
        return right.stargazersCount - left.stargazersCount
      }

      if (sortBy === 'forks') {
        return right.forksCount - left.forksCount
      }

      const leftDate = left.pushedAt ? new Date(left.pushedAt).getTime() : 0
      const rightDate = right.pushedAt ? new Date(right.pushedAt).getTime() : 0
      return rightDate - leftDate
    })

    return items
  }, [repositories, sortBy])

  return (
    <section className="profile-repositories-desktop">
      <div className="profile-repositories-desktop__header">
        <h2 className="profile-repositories-desktop__title">
          Repositories{' '}
          <span className="profile-repositories-desktop__count">
            ({totalCount})
          </span>
        </h2>

        <div className="profile-repositories-desktop__sort-wrap">
          <button
            type="button"
            className="profile-repositories-desktop__sort-btn"
            onClick={() => setIsSortOpen((open) => !open)}
          >
            Sort by: <strong>{SORT_LABELS[sortBy]}</strong>
            <i className="bi bi-chevron-down" aria-hidden="true" />
          </button>

          {isSortOpen ? (
            <div className="profile-repositories-desktop__sort-menu">
              {(Object.keys(SORT_LABELS) as ProfileRepoSortOption[]).map(
                (option) => (
                  <button
                    key={option}
                    type="button"
                    className="profile-repositories-desktop__sort-option"
                    onClick={() => {
                      onSortChange(option)
                      setIsSortOpen(false)
                    }}
                  >
                    {SORT_LABELS[option]}
                  </button>
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="profile-repositories-desktop__list">
        {isSearching ? (
          <RepositoryListSkeleton count={6} variant="mobile" />
        ) : (
          sortedRepositories.map((repository) => (
            <RepositoryListCard
              key={repository.id}
              repository={repository}
              variant="desktop"
            />
          ))
        )}
      </div>

      {isLoadingMore ? (
        <RepositoryListSkeleton count={3} variant="mobile" />
      ) : null}

      {hasMore ? (
        <div className="profile-repositories-desktop__load-more">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="profile-repositories-desktop__load-more-btn"
          >
            {isLoadingMore ? 'Carregando...' : 'Load more repositories'}
          </button>
        </div>
      ) : null}
    </section>
  )
}
