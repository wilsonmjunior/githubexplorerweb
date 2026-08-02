import type { GitHubRepositoryDto } from './github-repository-dto'
import type { RepositoryActivityDto } from './repository-activity-dto'
import type { RepositoryContributorDto } from './repository-contributor-dto'
import type { RepositoryLanguageDto } from './repository-language-dto'
import type { GithubRequestOptions } from './github-request-options'

export type GetGitHubRepositoryInputDto = GithubRequestOptions & {
  owner: string
  name: string
}

export type GetGitHubRepositoryDetailsOutputDto = {
  repository: GitHubRepositoryDto
  languages: RepositoryLanguageDto[]
  activities: RepositoryActivityDto[]
  contributors: RepositoryContributorDto[]
}
