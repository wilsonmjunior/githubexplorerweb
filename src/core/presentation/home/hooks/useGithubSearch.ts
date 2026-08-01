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
  const [results, setResults] = useState<GitHubUserDto[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (debouncedQuery.length < 2) {
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
        const useCase = makeSearchGitHubUsersUseCase()
        const result = await useCase.execute({
          query: debouncedQuery,
          perPage: 10,
        })

        if (!controller.signal.aborted) {
          setResults(result.users)
          setTotalCount(result.totalCount)
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
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false)
        }
      }
    }

    void search()

    return () => controller.abort()
  }, [debouncedQuery])

  return {
    query,
    setQuery,
    results,
    totalCount,
    isSearching,
    error,
    hasActiveSearch: debouncedQuery.length >= 2,
  }
}
