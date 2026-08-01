import { useEffect, useState } from 'react'
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
  const [hasLoaded, setHasLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isLoading = !hasLoaded

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const useCase = makeGetTrendingDevelopersUseCase()
        const result = await useCase.execute({ perPage: 5 })

        if (!cancelled) {
          setDevelopers(result.developers)
          setError(null)
          setHasLoaded(true)
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            getGithubErrorMessage(
              loadError,
              'Não foi possível carregar os desenvolvedores em alta.',
            ),
          )
          setHasLoaded(true)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return { developers, isLoading, error }
}
