import type { GitHubRepoSummaryDto } from './github-repo-summary-dto'

export type SearchGitHubRepositoriesInputDto = {
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
