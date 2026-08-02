import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { GitHubRepoSummaryDto, GitHubUserDto } from '@/core/domain/github'
import {
  makeGetGitHubUserUseCase,
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
  isLoadingRepos: boolean
  isLoadingMore: boolean
  isSearching: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
}

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 400

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
  const [isLoadingRepos, setIsLoadingRepos] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedSearch = useDebouncedValue(searchQuery.trim(), SEARCH_DEBOUNCE_MS)

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

  const fetchRepositories = useCallback(
    async (
      targetPage: number,
      append: boolean,
      sort: ProfileRepoSortOption,
    ) => {
      if (!login) {
        return
      }

      const searchUseCase = makeSearchGitHubRepositoriesUseCase()
      const searchQueryText = isSearchMode
        ? buildProfileSearchQuery(debouncedSearch, typeFilter, languageFilter)
        : ''

      const result = await searchUseCase.execute({
        query: searchQueryText,
        ownerLogin: login,
        perPage: PAGE_SIZE,
        page: targetPage,
        sort,
      })

      setRepositories((current) =>
        append ? [...current, ...result.repositories] : result.repositories,
      )
      setHasMore(targetPage * PAGE_SIZE < result.totalCount)
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
      setIsLoadingRepos(true)
      setIsSearching(true)
      setError(null)
      setPage(1)

      try {
        await fetchRepositories(1, false, sortBy)
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
          setIsLoadingRepos(false)
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
    sortBy,
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
      await fetchRepositories(nextPage, true, sortBy)
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
  }, [fetchRepositories, hasMore, isLoadingMore, login, page, sortBy])

  return {
    user,
    repositories,
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
    isLoadingRepos,
    isLoadingMore,
    isSearching,
    error,
    hasMore,
    loadMore,
  }
}
