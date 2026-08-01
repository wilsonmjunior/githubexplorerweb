import type { UseCase } from '@/core/domain/shared/types'
import type { GitHubClient } from '@/core/domain/github'
import type {
  GetUserRepositoriesInputDto,
  GetUserRepositoriesOutputDto,
} from '@/core/domain/github'

type GetUserRepositoriesUseCaseDeps = {
  githubClient: GitHubClient
}

export class GetUserRepositoriesUseCase
  implements UseCase<GetUserRepositoriesInputDto, GetUserRepositoriesOutputDto>
{
  private readonly githubClient: GitHubClient

  constructor(deps: GetUserRepositoriesUseCaseDeps) {
    this.githubClient = deps.githubClient
  }

  async execute(
    input: GetUserRepositoriesInputDto,
  ): Promise<GetUserRepositoriesOutputDto> {
    return this.githubClient.getUserRepositories(input)
  }
}
