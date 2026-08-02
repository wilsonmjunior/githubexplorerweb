import type { GitHubRepoSummaryDto } from './github-repo-summary-dto'
import type { GithubRequestOptions } from './github-request-options'

export type SearchGitHubRepositoriesInputDto = GithubRequestOptions & {
  query: string
  ownerLogin?: string
  perPage?: number
  page?: number
  sort?: 'stars' | 'forks' | 'updated'
}

export type SearchGitHubRepositoriesOutputDto = {
  repositories: GitHubRepoSummaryDto[]
  totalCount: number
}
