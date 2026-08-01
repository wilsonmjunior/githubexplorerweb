import type { GitHubRepoSummaryDto } from './github-repo-summary-dto'

export type GetUserRepositoriesInputDto = {
  login: string
  perPage?: number
  page?: number
  sort?: 'created' | 'updated' | 'pushed' | 'full_name'
}

export type GetUserRepositoriesOutputDto = {
  repositories: GitHubRepoSummaryDto[]
}
