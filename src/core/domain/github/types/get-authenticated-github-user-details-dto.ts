import type { AuthenticatedGitHubUserDto } from './authenticated-github-user-dto'
import type { GitHubOrganizationDto } from './github-organization-dto'

export type GetAuthenticatedGitHubUserDetailsOutputDto = {
  user: AuthenticatedGitHubUserDto
  organizations: GitHubOrganizationDto[]
}
