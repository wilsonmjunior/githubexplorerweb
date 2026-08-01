import { useEffect, useState } from 'react'
import type { GitHubRepoSummaryDto } from '@/core/domain/github'
import { makeSearchGitHubRepositoriesUseCase } from '@/core/composition/use-cases/make-github-usecases'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { getGithubErrorMessage } from '@/shared/utils/get-github-error-message'

type UseGithubRepositorySearchOptions = {
  ownerLogin?: string
  perPage?: number
  sort?: 'stars' | 'forks' | 'updated'
}

type UseGithubRepositorySearchResult = {
  query: string
  setQuery: (value: string) => void
  results: GitHubRepoSummaryDto[]
  totalCount: number
  isSearching: boolean
  error: string | null
  hasActiveSearch: boolean
}

const SEARCH_DEBOUNCE_MS = 400

export function useGithubRepositorySearch(
  options: UseGithubRepositorySearchOptions = {},
): UseGithubRepositorySearchResult {
  const { ownerLogin, perPage = 10, sort = 'stars' } = options
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS)
  const [results, setResults] = useState<GitHubRepoSummaryDto[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasActiveSearch = debouncedQuery.length >= 2

  useEffect(() => {
    if (!hasActiveSearch) {
      setResults([])
      setTotalCount(0)
      setError(null)
      setIsSearching(false)
      return
    }

    const controller = new AbortController()

    const search = async () => {
      setIsSearching(true)
      setError(null)

      try {
        const useCase = makeSearchGitHubRepositoriesUseCase()
        const result = await useCase.execute({
          query: debouncedQuery || '*',
          ownerLogin,
          perPage,
          sort,
        })

        if (!controller.signal.aborted) {
          setResults(result.repositories)
          setTotalCount(result.totalCount)
        }
      } catch (searchError) {
        if (!controller.signal.aborted) {
          setError(
            getGithubErrorMessage(
              searchError,
              'Não foi possível buscar repositórios no GitHub.',
            ),
          )
          setResults([])
          setTotalCount(0)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false)
        }
      }
    }

    void search()

    return () => controller.abort()
  }, [debouncedQuery, hasActiveSearch, ownerLogin, perPage, sort])

  return {
    query,
    setQuery,
    results,
    totalCount,
    isSearching,
    error,
    hasActiveSearch,
  }
}
