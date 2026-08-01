import type { GitHubRepoSummaryDto, GitHubUserDto } from '@/core/domain/github'
import { useGithubRepositorySearch } from '@/shared/hooks/useGithubRepositorySearch'
import { useGithubSearch } from '@/core/presentation/home/hooks/useGithubSearch'
import { useIsMobileViewport } from '@/shared/hooks/useIsMobileViewport'

type GithubSearchState = {
  query: string
  setQuery: (value: string) => void
  totalCount: number
  isSearching: boolean
  error: string | null
  hasActiveSearch: boolean
}

type ResponsiveHomeSearchResult =
  | (GithubSearchState & {
      mode: 'users'
      results: GitHubUserDto[]
    })
  | (GithubSearchState & {
      mode: 'repositories'
      results: GitHubRepoSummaryDto[]
    })

export function useResponsiveHomeSearch(): ResponsiveHomeSearchResult {
  const isMobile = useIsMobileViewport()
  const userSearch = useGithubSearch()
  const repositorySearch = useGithubRepositorySearch({ perPage: 10, sort: 'stars' })

  if (isMobile) {
    return {
      mode: 'repositories',
      query: repositorySearch.query,
      setQuery: repositorySearch.setQuery,
      results: repositorySearch.results,
      totalCount: repositorySearch.totalCount,
      isSearching: repositorySearch.isSearching,
      error: repositorySearch.error,
      hasActiveSearch: repositorySearch.hasActiveSearch,
    }
  }

  return {
    mode: 'users',
    query: userSearch.query,
    setQuery: userSearch.setQuery,
    results: userSearch.results,
    totalCount: userSearch.totalCount,
    isSearching: userSearch.isSearching,
    error: userSearch.error,
    hasActiveSearch: userSearch.hasActiveSearch,
  }
}
