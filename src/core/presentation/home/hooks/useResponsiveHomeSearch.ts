import type { GitHubUserDto } from '@/core/domain/github'
import { useGithubSearch } from '@/core/presentation/home/hooks/useGithubSearch'

type ResponsiveHomeSearchResult = {
  mode: 'users'
  query: string
  setQuery: (value: string) => void
  results: GitHubUserDto[]
  totalCount: number
  isSearching: boolean
  error: string | null
  hasActiveSearch: boolean
}

export function useResponsiveHomeSearch(): ResponsiveHomeSearchResult {
  const userSearch = useGithubSearch()

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
