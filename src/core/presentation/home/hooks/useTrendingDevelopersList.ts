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
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPage = useCallback(async (pageToLoad: number, append: boolean) => {
    if (append) {
      setIsLoadingMore(true)
    } else {
      setIsLoading(true)
    }

    setError(null)

    try {
      const useCase = makeGetTrendingDevelopersUseCase()
      const result = await useCase.execute({
        perPage: TRENDING_DEVELOPERS_PAGE_SIZE,
        page: pageToLoad,
      })

      setTotalCount(result.totalCount)
      setDevelopers((current) =>
        append ? [...current, ...result.developers] : result.developers,
      )
      setPage(pageToLoad)
    } catch (loadError) {
      setError(
        getGithubErrorMessage(
          loadError,
          'Não foi possível carregar os desenvolvedores em alta.',
        ),
      )
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    void fetchPage(1, false)
  }, [fetchPage])

  const hasMore = developers.length < totalCount

  const loadMore = useCallback(() => {
    if (isLoading || isLoadingMore || !hasMore) {
      return
    }

    void fetchPage(page + 1, true)
  }, [fetchPage, hasMore, isLoading, isLoadingMore, page])

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
