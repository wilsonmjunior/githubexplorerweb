import type { UseCase } from '@/core/domain/shared/types'
import type {
  GetAuthenticatedUserFollowingOutputDto,
  GitHubClient,
} from '@/core/domain/github'

type GetAuthenticatedUserFollowingUseCaseDeps = {
  githubClient: GitHubClient
}

export class GetAuthenticatedUserFollowingUseCase
  implements UseCase<undefined, GetAuthenticatedUserFollowingOutputDto>
{
  private readonly githubClient: GitHubClient

  constructor(deps: GetAuthenticatedUserFollowingUseCaseDeps) {
    this.githubClient = deps.githubClient
  }

  async execute(): Promise<GetAuthenticatedUserFollowingOutputDto> {
    return this.githubClient.getAuthenticatedUserFollowing()
  }
}
