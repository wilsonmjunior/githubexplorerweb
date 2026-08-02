import type { GitHubUserDto } from './github-user-dto'
import type { GithubRequestOptions } from './github-request-options'

export type SearchGitHubUsersInputDto = GithubRequestOptions & {
  query: string
  perPage?: number
  page?: number
}

export type SearchGitHubUsersOutputDto = {
  users: GitHubUserDto[]
  totalCount: number
}
