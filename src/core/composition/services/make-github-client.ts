import { GitHubApiClient } from '@/core/infra/github/services/github-api-client'
import { createGitHubHttpClient } from '@/core/infra/github/http/create-github-http-client'
import type { GitHubClient } from '@/core/domain/github'

let githubClient: GitHubClient | null = null

export function makeGitHubClient(): GitHubClient {
  if (!githubClient) {
    githubClient = new GitHubApiClient(createGitHubHttpClient())
  }

  return githubClient
}
