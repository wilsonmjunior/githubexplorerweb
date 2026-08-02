import { useEffect, useState } from 'react'
import type { GitHubUserDto } from '@/core/domain/github'
import { makeGetTrendingDevelopersUseCase } from '@/core/composition/use-cases/make-github-usecases'
import { getGithubErrorMessage } from '@/shared/utils/get-github-error-message'
import { isAbortError } from '@/shared/utils/is-abort-error'

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
    const controller = new AbortController()

    ;(async () => {
      try {
        const useCase = makeGetTrendingDevelopersUseCase()
        const result = await useCase.execute({
          perPage: 5,
          signal: controller.signal,
        })

        if (!controller.signal.aborted) {
          setDevelopers(result.developers)
          setError(null)
          setHasLoaded(true)
        }
      } catch (loadError) {
        if (controller.signal.aborted || isAbortError(loadError)) {
          return
        }

        if (!controller.signal.aborted) {
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

    return () => controller.abort()
  }, [])

  return { developers, isLoading, error }
}
