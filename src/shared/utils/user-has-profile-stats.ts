import type { GitHubUserDto } from '@/core/domain/github'

export function userHasProfileStats(user: GitHubUserDto): boolean {
  return user.followers > 0 || user.publicRepos > 0
}
