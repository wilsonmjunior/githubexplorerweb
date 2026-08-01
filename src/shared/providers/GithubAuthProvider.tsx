import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { GitHubUserDto } from '@/core/domain/github'
import { makeGetAuthenticatedGitHubUserUseCase } from '@/core/composition/use-cases/make-github-usecases'

type GithubAuthContextValue = {
  user: GitHubUserDto | null
  isLoading: boolean
}

const GithubAuthContext = createContext<GithubAuthContextValue | null>(null)

type GithubAuthProviderProps = {
  children: ReactNode
}

export function GithubAuthProvider({ children }: GithubAuthProviderProps) {
  const [user, setUser] = useState<GitHubUserDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadAuthenticatedUser() {
      try {
        const useCase = makeGetAuthenticatedGitHubUserUseCase()
        const authenticatedUser = await useCase.execute()

        if (isMounted) {
          setUser(authenticatedUser)
        }
      } catch {
        if (isMounted) {
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadAuthenticatedUser()

    return () => {
      isMounted = false
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
    }),
    [user, isLoading],
  )

  return (
    <GithubAuthContext.Provider value={value}>
      {children}
    </GithubAuthContext.Provider>
  )
}

export function useGithubAuth(): GithubAuthContextValue {
  const context = useContext(GithubAuthContext)

  if (!context) {
    throw new Error('useGithubAuth must be used within GithubAuthProvider')
  }

  return context
}
