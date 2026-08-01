import { useEffect, useState } from 'react'
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
  const repositoryKey = `${owner}/${repo}`
  const [loadedKey, setLoadedKey] = useState('')
  const [details, setDetails] =
    useState<GetGitHubRepositoryDetailsOutputDto | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isLoading = Boolean(owner && repo && loadedKey !== repositoryKey)

  useEffect(() => {
    if (!owner || !repo) {
      return
    }

    let cancelled = false
    const key = repositoryKey

    ;(async () => {
      try {
        const useCase = makeGetGitHubRepositoryDetailsUseCase()
        const result = await useCase.execute({ owner, name: repo })

        if (!cancelled) {
          setDetails(result)
          setError(null)
          setLoadedKey(key)
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            getGithubErrorMessage(
              loadError,
              'Não foi possível carregar o repositório.',
            ),
          )
          setDetails(null)
          setLoadedKey(key)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [owner, repo, repositoryKey])

  return { details, isLoading, error }
}
