import {
  GetAuthenticatedGitHubUserUseCase,
  GetGitHubRepositoryDetailsUseCase,
  GetGitHubUserUseCase,
  GetTrendingDevelopersUseCase,
  GetUserRepositoriesUseCase,
  SearchGitHubRepositoriesUseCase,
  SearchGitHubUsersUseCase,
} from '@/core/application/github'
import { makeGitHubClient } from '@/core/composition/services/make-github-client'

export function makeSearchGitHubUsersUseCase(): SearchGitHubUsersUseCase {
  return new SearchGitHubUsersUseCase({
    githubClient: makeGitHubClient(),
  })
}

export function makeSearchGitHubRepositoriesUseCase(): SearchGitHubRepositoriesUseCase {
  return new SearchGitHubRepositoriesUseCase({
    githubClient: makeGitHubClient(),
  })
}

export function makeGetTrendingDevelopersUseCase(): GetTrendingDevelopersUseCase {
  return new GetTrendingDevelopersUseCase({
    githubClient: makeGitHubClient(),
  })
}

export function makeGetGitHubUserUseCase(): GetGitHubUserUseCase {
  return new GetGitHubUserUseCase({
    githubClient: makeGitHubClient(),
  })
}

export function makeGetAuthenticatedGitHubUserUseCase(): GetAuthenticatedGitHubUserUseCase {
  return new GetAuthenticatedGitHubUserUseCase({
    githubClient: makeGitHubClient(),
  })
}

export function makeGetUserRepositoriesUseCase(): GetUserRepositoriesUseCase {
  return new GetUserRepositoriesUseCase({
    githubClient: makeGitHubClient(),
  })
}

export function makeGetGitHubRepositoryDetailsUseCase(): GetGitHubRepositoryDetailsUseCase {
  return new GetGitHubRepositoryDetailsUseCase({
    githubClient: makeGitHubClient(),
  })
}
