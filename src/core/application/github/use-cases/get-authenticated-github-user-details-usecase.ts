import type { UseCase } from '@/core/domain/shared/types'
import type {
  GetAuthenticatedGitHubUserDetailsOutputDto,
  GitHubClient,
} from '@/core/domain/github'

type GetAuthenticatedGitHubUserDetailsUseCaseDeps = {
  githubClient: GitHubClient
}

export class GetAuthenticatedGitHubUserDetailsUseCase
  implements UseCase<undefined, GetAuthenticatedGitHubUserDetailsOutputDto | null>
{
  private readonly githubClient: GitHubClient

  constructor(deps: GetAuthenticatedGitHubUserDetailsUseCaseDeps) {
    this.githubClient = deps.githubClient
  }

  async execute(): Promise<GetAuthenticatedGitHubUserDetailsOutputDto | null> {
    return this.githubClient.getAuthenticatedUserDetails()
  }
}
