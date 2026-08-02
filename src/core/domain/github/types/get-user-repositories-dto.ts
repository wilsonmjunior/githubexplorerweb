import type { GitHubRepoSummaryDto } from './github-repo-summary-dto'
import type { GithubRequestOptions } from './github-request-options'

export type GetUserRepositoriesInputDto = GithubRequestOptions & {
  login: string
  perPage?: number
  page?: number
  sort?: 'created' | 'updated' | 'pushed' | 'full_name'
}

export type GetUserRepositoriesOutputDto = {
  repositories: GitHubRepoSummaryDto[]
}
