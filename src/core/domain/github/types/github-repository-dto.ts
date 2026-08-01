export type GitHubRepositoryOwnerDto = {
  login: string
  avatarUrl: string
  htmlUrl: string
}

export type GitHubRepositoryDto = {
  id: number
  name: string
  fullName: string
  owner: GitHubRepositoryOwnerDto
  description: string | null
  htmlUrl: string
  isPrivate: boolean
  stargazersCount: number
  forksCount: number
  watchersCount: number
  openIssuesCount: number
  language: string | null
  license: string | null
  topics: string[]
  defaultBranch: string
  pushedAt: string | null
}
