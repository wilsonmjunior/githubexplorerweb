import { useCallback, useEffect, useState } from 'react'
import type { GitHubUserDto } from '@/core/domain/github'
import { makeGetTrendingDevelopersUseCase } from '@/core/composition/use-cases/make-github-usecases'
import { getGithubErrorMessage } from '@/shared/utils/get-github-error-message'

const TRENDING_DEVELOPERS_PAGE_SIZE = 20

type UseTrendingDevelopersListResult = {
  developers: GitHubUserDto[]
  totalCount: number
  isLoading: boolean
  isLoadingMore: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
}

export function useTrendingDevelopersList(): UseTrendingDevelopersListResult {
  const [developers, setDevelopers] = useState<GitHubUserDto[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(0)
  const [loadedPage, setLoadedPage] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isLoading = loadedPage < 1

  const fetchTrendingPage = useCallback(async (pageToLoad: number) => {
    const useCase = makeGetTrendingDevelopersUseCase()
    return useCase.execute({
      perPage: TRENDING_DEVELOPERS_PAGE_SIZE,
      page: pageToLoad,
    })
  }, [])

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const result = await fetchTrendingPage(1)

        if (!cancelled) {
          setTotalCount(result.totalCount)
          setDevelopers(result.developers)
          setPage(1)
          setLoadedPage(1)
          setError(null)
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            getGithubErrorMessage(
              loadError,
              'Não foi possível carregar os desenvolvedores em alta.',
            ),
          )
          setLoadedPage(1)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [fetchTrendingPage])

  const hasMore = developers.length < totalCount

  const loadMore = useCallback(() => {
    if (isLoading || isLoadingMore || !hasMore) {
      return
    }

    const nextPage = page + 1

    ;(async () => {
      setIsLoadingMore(true)
      setError(null)

      try {
        const result = await fetchTrendingPage(nextPage)

        setTotalCount(result.totalCount)
        setDevelopers((current) => [...current, ...result.developers])
        setPage(nextPage)
      } catch (loadError) {
        setError(
          getGithubErrorMessage(
            loadError,
            'Não foi possível carregar os desenvolvedores em alta.',
          ),
        )
      } finally {
        setIsLoadingMore(false)
      }
    })()
  }, [fetchTrendingPage, hasMore, isLoading, isLoadingMore, page])

  return {
    developers,
    totalCount,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
  }
}
