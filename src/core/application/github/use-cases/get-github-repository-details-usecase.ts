import type { UseCase } from '@/core/domain/shared/types'
import type { GitHubClient } from '@/core/domain/github'
import type {
  GetGitHubRepositoryDetailsOutputDto,
  GetGitHubRepositoryInputDto,
} from '@/core/domain/github'

type GetGitHubRepositoryDetailsUseCaseDeps = {
  githubClient: GitHubClient
}

export class GetGitHubRepositoryDetailsUseCase
  implements
    UseCase<GetGitHubRepositoryInputDto, GetGitHubRepositoryDetailsOutputDto>
{
  private readonly githubClient: GitHubClient

  constructor(deps: GetGitHubRepositoryDetailsUseCaseDeps) {
    this.githubClient = deps.githubClient
  }

  async execute(
    input: GetGitHubRepositoryInputDto,
  ): Promise<GetGitHubRepositoryDetailsOutputDto> {
    return this.githubClient.getRepositoryDetails(input)
  }
}
