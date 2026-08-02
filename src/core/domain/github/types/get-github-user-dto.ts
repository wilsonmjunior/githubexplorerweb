import type { GitHubUserDto } from './github-user-dto'
import type { GithubRequestOptions } from './github-request-options'

export type GetGitHubUserInputDto = GithubRequestOptions & {
  login: string
}

export type GetGitHubUserOutputDto = {
  user: GitHubUserDto
}
