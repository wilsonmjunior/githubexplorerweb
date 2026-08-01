import type { GitHubOrganizationDto } from '@/core/domain/github'

type GitHubApiOrganization = {
  id: number
  login: string
  avatar_url: string
  html_url: string
  description?: string | null
}

export function mapGitHubOrganization(
  organization: GitHubApiOrganization,
): GitHubOrganizationDto {
  return {
    id: organization.id,
    login: organization.login,
    avatarUrl: organization.avatar_url,
    htmlUrl: organization.html_url,
    description: organization.description ?? null,
  }
}
