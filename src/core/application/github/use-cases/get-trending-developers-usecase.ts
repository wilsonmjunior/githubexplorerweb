import type { UseCase } from '@/core/domain/shared/types'
import type { GitHubClient } from '@/core/domain/github'
import type {
  GetTrendingDevelopersInputDto,
  GetTrendingDevelopersOutputDto,
} from '@/core/domain/github'

type GetTrendingDevelopersUseCaseDeps = {
  githubClient: GitHubClient
}

export class GetTrendingDevelopersUseCase
  implements UseCase<GetTrendingDevelopersInputDto, GetTrendingDevelopersOutputDto>
{
  private readonly githubClient: GitHubClient

  constructor(deps: GetTrendingDevelopersUseCaseDeps) {
    this.githubClient = deps.githubClient
  }

  async execute(
    input: GetTrendingDevelopersInputDto,
  ): Promise<GetTrendingDevelopersOutputDto> {
    return this.githubClient.getTrendingDevelopers(input)
  }
}
