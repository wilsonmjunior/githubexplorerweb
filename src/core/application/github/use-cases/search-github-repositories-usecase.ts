import type { UseCase } from '@/core/domain/shared/types'
import type { GitHubClient } from '@/core/domain/github'
import type {
  SearchGitHubRepositoriesInputDto,
  SearchGitHubRepositoriesOutputDto,
} from '@/core/domain/github'

type SearchGitHubRepositoriesUseCaseDeps = {
  githubClient: GitHubClient
}

export class SearchGitHubRepositoriesUseCase
  implements
    UseCase<SearchGitHubRepositoriesInputDto, SearchGitHubRepositoriesOutputDto>
{
  private readonly githubClient: GitHubClient

  constructor(deps: SearchGitHubRepositoriesUseCaseDeps) {
    this.githubClient = deps.githubClient
  }

  async execute(
    input: SearchGitHubRepositoriesInputDto,
  ): Promise<SearchGitHubRepositoriesOutputDto> {
    const query = input.query.trim()

    if (query.length < 2 && !input.ownerLogin) {
      return { repositories: [], totalCount: 0 }
    }

    return this.githubClient.searchRepositories(input)
  }
}
