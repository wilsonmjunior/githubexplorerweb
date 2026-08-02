import type { GitHubUserDto } from './github-user-dto'
import type { GithubRequestOptions } from './github-request-options'

export type GetTrendingDevelopersInputDto = GithubRequestOptions & {
  perPage?: number
  page?: number
}

export type GetTrendingDevelopersOutputDto = {
  developers: GitHubUserDto[]
  totalCount: number
}
