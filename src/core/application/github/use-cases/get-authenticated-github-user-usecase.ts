import type { UseCase } from '@/core/domain/shared/types'
import type { GitHubClient } from '@/core/domain/github'
import type { GitHubUserDto } from '@/core/domain/github'

type GetAuthenticatedGitHubUserUseCaseDeps = {
  githubClient: GitHubClient
}

export class GetAuthenticatedGitHubUserUseCase
  implements UseCase<undefined, GitHubUserDto | null>
{
  private readonly githubClient: GitHubClient

  constructor(deps: GetAuthenticatedGitHubUserUseCaseDeps) {
    this.githubClient = deps.githubClient
  }

  async execute(): Promise<GitHubUserDto | null> {
    return this.githubClient.getAuthenticatedUser()
  }
}
