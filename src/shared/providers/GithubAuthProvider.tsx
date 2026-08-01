import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { GitHubUserDto } from '@/core/domain/github'
import {
  makeGetAuthenticatedGitHubUserUseCase,
  makeGetAuthenticatedUserFollowingUseCase,
} from '@/core/composition/use-cases/make-github-usecases'

type GithubAuthContextValue = {
  user: GitHubUserDto | null
  isLoading: boolean
  isFollowing: (login: string) => boolean
}

const GithubAuthContext = createContext<GithubAuthContextValue | null>(null)

type GithubAuthProviderProps = {
  children: ReactNode
}

export function GithubAuthProvider({ children }: GithubAuthProviderProps) {
  const [user, setUser] = useState<GitHubUserDto | null>(null)
  const [followingLogins, setFollowingLogins] = useState<ReadonlySet<string>>(
    () => new Set(),
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadAuthenticatedSession() {
      try {
        const userUseCase = makeGetAuthenticatedGitHubUserUseCase()
        const authenticatedUser = await userUseCase.execute()

        if (!isMounted) {
          return
        }

        setUser(authenticatedUser)

        if (!authenticatedUser) {
          setFollowingLogins(new Set())
          return
        }

        const followingUseCase = makeGetAuthenticatedUserFollowingUseCase()
        const following = await followingUseCase.execute()

        if (isMounted) {
          setFollowingLogins(
            new Set(following.logins.map((login) => login.toLowerCase())),
          )
        }
      } catch {
        if (isMounted) {
          setUser(null)
          setFollowingLogins(new Set())
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadAuthenticatedSession()

    return () => {
      isMounted = false
    }
  }, [])

  const isFollowing = useCallback(
    (login: string) => {
      if (!user) {
        return false
      }

      if (user.login.toLowerCase() === login.toLowerCase()) {
        return false
      }

      return followingLogins.has(login.toLowerCase())
    },
    [followingLogins, user],
  )

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isFollowing,
    }),
    [user, isLoading, isFollowing],
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
