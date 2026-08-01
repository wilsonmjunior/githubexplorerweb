import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type {
  GetGitHubRepositoryDetailsOutputDto,
} from '@/core/domain/github'
import { makeGetGitHubRepositoryDetailsUseCase } from '@/core/composition/use-cases/make-github-usecases'
import { getGithubErrorMessage } from '@/shared/utils/get-github-error-message'

type UseGithubRepositoryResult = {
  details: GetGitHubRepositoryDetailsOutputDto | null
  isLoading: boolean
  error: string | null
}

export function useGithubRepository(): UseGithubRepositoryResult {
  const { owner = '', repo = '' } = useParams()
  const [details, setDetails] =
    useState<GetGitHubRepositoryDetailsOutputDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadRepository = useCallback(async () => {
    if (!owner || !repo) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const useCase = makeGetGitHubRepositoryDetailsUseCase()
      const result = await useCase.execute({ owner, name: repo })
      setDetails(result)
    } catch (loadError) {
      setError(
        getGithubErrorMessage(
          loadError,
          'Não foi possível carregar o repositório.',
        ),
      )
      setDetails(null)
    } finally {
      setIsLoading(false)
    }
  }, [owner, repo])

  useEffect(() => {
    void loadRepository()
  }, [loadRepository])

  return { details, isLoading, error }
}
