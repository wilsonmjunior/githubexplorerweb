import type { AuthenticatedGitHubUserDto } from '@/core/domain/github'
import { mapGitHubUser } from '@/core/infra/github/mappers/github-user-mapper'

type GitHubApiAuthenticatedUser = Parameters<typeof mapGitHubUser>[0] & {
  email?: string | null
  created_at?: string
  updated_at?: string
  private_gists?: number
  total_private_repos?: number
  owned_private_repos?: number
  disk_usage?: number
  collaborators?: number
  twitter_username?: string | null
  hireable?: boolean | null
}

export function mapAuthenticatedGitHubUser(
  user: GitHubApiAuthenticatedUser,
): AuthenticatedGitHubUserDto {
  const baseUser = mapGitHubUser(user)

  return {
    ...baseUser,
    email: user.email ?? null,
    createdAt: user.created_at ?? '',
    updatedAt: user.updated_at ?? '',
    privateRepos: user.total_private_repos ?? 0,
    totalPrivateRepos: user.total_private_repos ?? 0,
    ownedPrivateRepos: user.owned_private_repos ?? 0,
    diskUsage: user.disk_usage ?? 0,
    collaborators: user.collaborators ?? 0,
    twitterUsername: user.twitter_username ?? null,
    hireable: user.hireable ?? null,
  }
}
