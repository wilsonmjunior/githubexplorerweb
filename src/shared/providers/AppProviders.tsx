import type { ReactNode } from 'react'
import { useBootstrapTheme } from '@/shared/hooks/useBootstrapTheme'
import { GithubAuthProvider } from '@/shared/providers/GithubAuthProvider'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  useBootstrapTheme()

  return <GithubAuthProvider>{children}</GithubAuthProvider>
}
