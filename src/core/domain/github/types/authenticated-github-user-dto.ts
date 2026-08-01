import type { GitHubUserDto } from './github-user-dto'

export type AuthenticatedGitHubUserDto = GitHubUserDto & {
  email: string | null
  createdAt: string
  updatedAt: string
  privateRepos: number
  totalPrivateRepos: number
  ownedPrivateRepos: number
  diskUsage: number
  collaborators: number
  twitterUsername: string | null
  hireable: boolean | null
}
