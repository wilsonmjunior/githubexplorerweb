import type { UseCase } from '@/core/domain/shared/types'
import type { GitHubClient } from '@/core/domain/github'
import type {
  SearchGitHubUsersInputDto,
  SearchGitHubUsersOutputDto,
} from '@/core/domain/github'

type SearchGitHubUsersUseCaseDeps = {
  githubClient: GitHubClient
}

export class SearchGitHubUsersUseCase
  implements UseCase<SearchGitHubUsersInputDto, SearchGitHubUsersOutputDto>
{
  private readonly githubClient: GitHubClient

  constructor(deps: SearchGitHubUsersUseCaseDeps) {
    this.githubClient = deps.githubClient
  }

  async execute(
    input: SearchGitHubUsersInputDto,
  ): Promise<SearchGitHubUsersOutputDto> {
    const query = input.query.trim()

    if (query.length < 2) {
      return { users: [], totalCount: 0 }
    }

    return this.githubClient.searchUsers(input)
  }
}
