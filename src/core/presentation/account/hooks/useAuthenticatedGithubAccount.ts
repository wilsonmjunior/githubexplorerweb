import { useCallback, useEffect, useState } from 'react'
import type {
  AuthenticatedGitHubUserDto,
  GetAuthenticatedGitHubUserDetailsOutputDto,
  GitHubOrganizationDto,
  GitHubRepoSummaryDto,
} from '@/core/domain/github'
import {
  makeGetAuthenticatedGitHubUserDetailsUseCase,
  makeGetUserRepositoriesUseCase,
} from '@/core/composition/use-cases/make-github-usecases'
import { getGithubErrorMessage } from '@/shared/utils/get-github-error-message'

type UseAuthenticatedGithubAccountResult = {
  user: AuthenticatedGitHubUserDto | null
  organizations: GitHubOrganizationDto[]
  repositories: GitHubRepoSummaryDto[]
  isLoading: boolean
  isLoadingMore: boolean
  error: string | null
  isUnauthenticated: boolean
  hasMore: boolean
  loadMore: () => void
}

const PAGE_SIZE = 10

export function useAuthenticatedGithubAccount(): UseAuthenticatedGithubAccountResult {
  const [details, setDetails] =
    useState<GetAuthenticatedGitHubUserDetailsOutputDto | null>(null)
  const [repositories, setRepositories] = useState<GitHubRepoSummaryDto[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUnauthenticated, setIsUnauthenticated] = useState(false)

  const loadRepositories = useCallback(
    async (login: string, pageNumber: number, append: boolean) => {
      const useCase = makeGetUserRepositoriesUseCase()
      const result = await useCase.execute({
        login,
        sort: 'updated',
        perPage: PAGE_SIZE,
        page: pageNumber,
      })

      setRepositories((current) =>
        append ? [...current, ...result.repositories] : result.repositories,
      )
      setHasMore(result.repositories.length === PAGE_SIZE)
    },
    [],
  )

  useEffect(() => {
    let isMounted = true

    async function loadAccount() {
      setIsLoading(true)
      setError(null)
      setIsUnauthenticated(false)

      try {
        const useCase = makeGetAuthenticatedGitHubUserDetailsUseCase()
        const accountDetails = await useCase.execute()

        if (!isMounted) {
          return
        }

        if (!accountDetails) {
          setDetails(null)
          setRepositories([])
          setIsUnauthenticated(true)
          return
        }

        setDetails(accountDetails)
        await loadRepositories(accountDetails.user.login, 1, false)

        if (isMounted) {
          setPage(1)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            getGithubErrorMessage(
              loadError,
              'Não foi possível carregar os dados da sua conta.',
            ),
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadAccount()

    return () => {
      isMounted = false
    }
  }, [loadRepositories])

  const loadMore = useCallback(async () => {
    if (!details?.user || isLoadingMore || !hasMore) {
      return
    }

    const nextPage = page + 1
    setIsLoadingMore(true)

    try {
      await loadRepositories(details.user.login, nextPage, true)
      setPage(nextPage)
    } catch (loadError) {
      setError(
        getGithubErrorMessage(
          loadError,
          'Não foi possível carregar mais repositórios.',
        ),
      )
    } finally {
      setIsLoadingMore(false)
    }
  }, [details, hasMore, isLoadingMore, loadRepositories, page])

  return {
    user: details?.user ?? null,
    organizations: details?.organizations ?? [],
    repositories,
    isLoading,
    isLoadingMore,
    error,
    isUnauthenticated,
    hasMore,
    loadMore,
  }
}
