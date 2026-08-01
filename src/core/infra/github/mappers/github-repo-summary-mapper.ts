import type { GitHubRepoSummaryDto } from '@/core/domain/github'

type GitHubApiRepoSummary = {
  id: number
  name: string
  full_name: string
  owner: { login: string }
  description?: string | null
  html_url: string
  private: boolean
  language?: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  license?: { name: string } | null
  pushed_at?: string | null
}

export function mapGitHubRepoSummary(
  repository: GitHubApiRepoSummary,
): GitHubRepoSummaryDto {
  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    ownerLogin: repository.owner.login,
    description: repository.description ?? null,
    htmlUrl: repository.html_url,
    isPrivate: repository.private,
    language: repository.language ?? null,
    stargazersCount: repository.stargazers_count,
    forksCount: repository.forks_count,
    license: repository.license?.name ?? null,
    pushedAt: repository.pushed_at ?? null,
    isFork: repository.fork,
  }
}
