import type { GitHubRepositoryDto } from '@/core/domain/github'

type GitHubApiRepository = {
  id: number
  name: string
  full_name: string
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  description?: string | null
  html_url: string
  private: boolean
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  language?: string | null
  license?: { name: string } | null
  topics?: string[]
  default_branch: string
  pushed_at?: string | null
}

export function mapGitHubRepository(
  repository: GitHubApiRepository,
): GitHubRepositoryDto {
  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    owner: {
      login: repository.owner.login,
      avatarUrl: repository.owner.avatar_url,
      htmlUrl: repository.owner.html_url,
    },
    description: repository.description ?? null,
    htmlUrl: repository.html_url,
    isPrivate: repository.private,
    stargazersCount: repository.stargazers_count,
    forksCount: repository.forks_count,
    watchersCount: repository.watchers_count,
    openIssuesCount: repository.open_issues_count,
    language: repository.language ?? null,
    license: repository.license?.name ?? null,
    topics: repository.topics ?? [],
    defaultBranch: repository.default_branch,
    pushedAt: repository.pushed_at ?? null,
  }
}
