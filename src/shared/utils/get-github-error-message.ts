import { GitHubApiException } from '@/core/domain/github/exceptions/github-api-exception'

export function getGithubErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof GitHubApiException) {
    return error.message
  }

  return fallback
}
