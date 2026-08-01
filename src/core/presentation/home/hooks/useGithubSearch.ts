import { useEffect, useState } from 'react'
import type { GitHubUserDto } from '@/core/domain/github'
import { makeSearchGitHubUsersUseCase } from '@/core/composition/use-cases/make-github-usecases'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { getGithubErrorMessage } from '@/shared/utils/get-github-error-message'

type UseGithubSearchResult = {
  query: string
  setQuery: (value: string) => void
  results: GitHubUserDto[]
  totalCount: number
  isSearching: boolean
  error: string | null
  hasActiveSearch: boolean
}

const SEARCH_DEBOUNCE_MS = 400

export function useGithubSearch(): UseGithubSearchResult {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS)
  const hasActiveSearch = debouncedQuery.length >= 2
  const [loadedQuery, setLoadedQuery] = useState('')
  const [results, setResults] = useState<GitHubUserDto[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const hasCurrentResults = hasActiveSearch && loadedQuery === debouncedQuery
  const isSearching = hasActiveSearch && loadedQuery !== debouncedQuery

  useEffect(() => {
    if (!hasActiveSearch) {
      return
    }

    const controller = new AbortController()
    const queryToSearch = debouncedQuery

    ;(async () => {
      try {
        const useCase = makeSearchGitHubUsersUseCase()
        const result = await useCase.execute({
          query: queryToSearch,
          perPage: 10,
        })

        if (!controller.signal.aborted) {
          setResults(result.users)
          setTotalCount(result.totalCount)
          setError(null)
          setLoadedQuery(queryToSearch)
        }
      } catch (searchError) {
        if (!controller.signal.aborted) {
          setError(
            getGithubErrorMessage(
              searchError,
              'Não foi possível buscar usuários no GitHub.',
            ),
          )
          setResults([])
          setTotalCount(0)
          setLoadedQuery(queryToSearch)
        }
      }
    })()

    return () => controller.abort()
  }, [debouncedQuery, hasActiveSearch])

  return {
    query,
    setQuery,
    results: hasCurrentResults ? results : [],
    totalCount: hasCurrentResults ? totalCount : 0,
    isSearching,
    error: hasCurrentResults ? error : null,
    hasActiveSearch,
  }
}
