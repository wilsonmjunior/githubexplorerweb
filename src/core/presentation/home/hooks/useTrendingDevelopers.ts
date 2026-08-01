import { useCallback, useEffect, useState } from 'react'
import type { GitHubUserDto } from '@/core/domain/github'
import { makeGetTrendingDevelopersUseCase } from '@/core/composition/use-cases/make-github-usecases'
import { getGithubErrorMessage } from '@/shared/utils/get-github-error-message'

type UseTrendingDevelopersResult = {
  developers: GitHubUserDto[]
  isLoading: boolean
  error: string | null
}

export function useTrendingDevelopers(): UseTrendingDevelopersResult {
  const [developers, setDevelopers] = useState<GitHubUserDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDevelopers = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const useCase = makeGetTrendingDevelopersUseCase()
      const result = await useCase.execute({ perPage: 5 })
      setDevelopers(result.developers)
    } catch (loadError) {
      setError(
        getGithubErrorMessage(
          loadError,
          'Não foi possível carregar os desenvolvedores em alta.',
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadDevelopers()
  }, [loadDevelopers])

  return { developers, isLoading, error }
}
