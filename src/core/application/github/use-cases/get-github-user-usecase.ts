import type { UseCase } from '@/core/domain/shared/types'
import type { GitHubClient } from '@/core/domain/github'
import type {
  GetGitHubUserInputDto,
  GetGitHubUserOutputDto,
} from '@/core/domain/github'

type GetGitHubUserUseCaseDeps = {
  githubClient: GitHubClient
}

export class GetGitHubUserUseCase
  implements UseCase<GetGitHubUserInputDto, GetGitHubUserOutputDto>
{
  private readonly githubClient: GitHubClient

  constructor(deps: GetGitHubUserUseCaseDeps) {
    this.githubClient = deps.githubClient
  }

  async execute(input: GetGitHubUserInputDto): Promise<GetGitHubUserOutputDto> {
    const user = await this.githubClient.getUser(input.login)
    return { user }
  }
}
