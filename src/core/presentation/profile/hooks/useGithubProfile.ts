import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { GitHubRepoSummaryDto, GitHubUserDto } from '@/core/domain/github'
import {
  makeGetGitHubUserUseCase,
  makeGetUserRepositoriesUseCase,
  makeSearchGitHubRepositoriesUseCase,
} from '@/core/composition/use-cases/make-github-usecases'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { getGithubErrorMessage } from '@/shared/utils/get-github-error-message'

export type ProfileRepoTypeFilter = 'all' | 'sources' | 'forks'
export type ProfileRepoSortOption = 'stars' | 'forks' | 'updated'

type UseGithubProfileResult = {
  user: GitHubUserDto | null
  repositories: GitHubRepoSummaryDto[]
  searchQuery: string
  setSearchQuery: (value: string) => void
  typeFilter: ProfileRepoTypeFilter
  setTypeFilter: (value: ProfileRepoTypeFilter) => void
  languageFilter: string
  setLanguageFilter: (value: string) => void
  availableLanguages: string[]
  sortBy: ProfileRepoSortOption
  setSortBy: (value: ProfileRepoSortOption) => void
  isLoading: boolean
  isLoadingMore: boolean
  isSearching: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
}

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 400

function sortRepositories(
  repositories: GitHubRepoSummaryDto[],
  sortBy: ProfileRepoSortOption,
): GitHubRepoSummaryDto[] {
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
}

function buildProfileSearchQuery(
  query: string,
  typeFilter: ProfileRepoTypeFilter,
  languageFilter: string,
): string {
  const parts: string[] = []

  if (query) {
    parts.push(query)
  }

  if (typeFilter === 'sources') {
    parts.push('fork:false')
  }

  if (typeFilter === 'forks') {
    parts.push('fork:true')
  }

  if (languageFilter !== 'all') {
    parts.push(`language:${languageFilter}`)
  }

  return parts.join(' ').trim()
}

export function useGithubProfile(): UseGithubProfileResult {
  const { login = '' } = useParams()
  const [user, setUser] = useState<GitHubUserDto | null>(null)
  const [repositories, setRepositories] = useState<GitHubRepoSummaryDto[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<ProfileRepoTypeFilter>('all')
  const [languageFilter, setLanguageFilter] = useState('all')
  const [sortBy, setSortBy] = useState<ProfileRepoSortOption>('stars')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedSearch = useDebouncedValue(searchQuery.trim(), SEARCH_DEBOUNCE_MS)
  const sortByRef = useRef(sortBy)
  sortByRef.current = sortBy

  const isSearchMode =
    debouncedSearch.length >= 2 ||
    typeFilter !== 'all' ||
    languageFilter !== 'all'

  const availableLanguages = useMemo(() => {
    const languages = new Set<string>()

    repositories.forEach((repository) => {
      if (repository.language) {
        languages.add(repository.language)
      }
    })

    return Array.from(languages).sort((left, right) => left.localeCompare(right))
  }, [repositories])

  const sortedRepositories = useMemo(() => {
    return isSearchMode ? repositories : sortRepositories(repositories, sortBy)
  }, [isSearchMode, repositories, sortBy])

  const fetchRepositories = useCallback(
    async (targetPage: number, append: boolean) => {
      if (!login) {
        return
      }

      if (isSearchMode) {
        const searchUseCase = makeSearchGitHubRepositoriesUseCase()
        const searchQueryText = buildProfileSearchQuery(
          debouncedSearch,
          typeFilter,
          languageFilter,
        )

        const result = await searchUseCase.execute({
          query: searchQueryText || '*',
          ownerLogin: login,
          perPage: PAGE_SIZE,
          page: targetPage,
          sort: sortByRef.current,
        })

        setRepositories((current) =>
          append ? [...current, ...result.repositories] : result.repositories,
        )
        setHasMore(result.repositories.length === PAGE_SIZE)
        return
      }

      const reposUseCase = makeGetUserRepositoriesUseCase()
      const result = await reposUseCase.execute({
        login,
        perPage: PAGE_SIZE,
        page: targetPage,
        sort: 'pushed',
      })

      setRepositories((current) =>
        append ? [...current, ...result.repositories] : result.repositories,
      )
      setHasMore(result.repositories.length === PAGE_SIZE)
    },
    [debouncedSearch, isSearchMode, languageFilter, login, typeFilter],
  )

  useEffect(() => {
    if (!login) {
      return
    }

    const controller = new AbortController()

    const loadUser = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const userUseCase = makeGetGitHubUserUseCase()
        const userResult = await userUseCase.execute({ login })

        if (!controller.signal.aborted) {
          setUser(userResult.user)
        }
      } catch (profileError) {
        if (!controller.signal.aborted) {
          setError(
            getGithubErrorMessage(
              profileError,
              'Não foi possível carregar o perfil.',
            ),
          )
          setUser(null)
          setRepositories([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadUser()

    return () => controller.abort()
  }, [login])

  useEffect(() => {
    if (!login || !user) {
      return
    }

    const controller = new AbortController()

    const loadRepositories = async () => {
      setIsSearching(true)
      setError(null)
      setPage(1)

      try {
        await fetchRepositories(1, false)
      } catch (reposError) {
        if (!controller.signal.aborted) {
          setError(
            getGithubErrorMessage(
              reposError,
              'Não foi possível carregar os repositórios.',
            ),
          )
          setRepositories([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false)
        }
      }
    }

    void loadRepositories()

    return () => controller.abort()
  }, [
    debouncedSearch,
    fetchRepositories,
    isSearchMode,
    languageFilter,
    login,
    isSearchMode ? sortBy : null,
    typeFilter,
    user,
  ])

  const loadMore = useCallback(async () => {
    if (!login || isLoadingMore || !hasMore) {
      return
    }

    setIsLoadingMore(true)
    setError(null)

    try {
      const nextPage = page + 1
      await fetchRepositories(nextPage, true)
      setPage(nextPage)
    } catch (loadMoreError) {
      setError(
        getGithubErrorMessage(
          loadMoreError,
          'Não foi possível carregar mais repositórios.',
        ),
      )
    } finally {
      setIsLoadingMore(false)
    }
  }, [fetchRepositories, hasMore, isLoadingMore, login, page])

  return {
    user,
    repositories: sortedRepositories,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    languageFilter,
    setLanguageFilter,
    availableLanguages,
    sortBy,
    setSortBy,
    isLoading,
    isLoadingMore,
    isSearching,
    error,
    hasMore,
    loadMore,
  }
}
