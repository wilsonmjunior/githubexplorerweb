import type { GitHubUserDto } from './github-user-dto'

export type GetTrendingDevelopersInputDto = {
  perPage?: number
  page?: number
}

export type GetTrendingDevelopersOutputDto = {
  developers: GitHubUserDto[]
  totalCount: number
}
