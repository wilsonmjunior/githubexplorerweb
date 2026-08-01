import type { GitHubUserDto } from './github-user-dto'

export type SearchGitHubUsersInputDto = {
  query: string
  perPage?: number
  page?: number
}

export type SearchGitHubUsersOutputDto = {
  users: GitHubUserDto[]
  totalCount: number
}
