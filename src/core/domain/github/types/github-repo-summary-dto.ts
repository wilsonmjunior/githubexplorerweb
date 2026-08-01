export type GitHubRepoSummaryDto = {
  id: number
  name: string
  fullName: string
  ownerLogin: string
  description: string | null
  htmlUrl: string
  isPrivate: boolean
  language: string | null
  stargazersCount: number
  forksCount: number
  license: string | null
  pushedAt: string | null
  isFork: boolean
}
