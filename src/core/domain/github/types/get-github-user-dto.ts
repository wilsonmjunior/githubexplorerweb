import type { GitHubUserDto } from './github-user-dto'

export type GetGitHubUserInputDto = {
  login: string
}

export type GetGitHubUserOutputDto = {
  user: GitHubUserDto
}
