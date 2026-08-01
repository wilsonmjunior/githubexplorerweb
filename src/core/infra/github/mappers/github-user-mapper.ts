import type { GitHubUserDto } from '@/core/domain/github'

type GitHubApiUser = {
  id: number
  login: string
  avatar_url: string
  html_url: string
  name?: string | null
  bio?: string | null
  location?: string | null
  blog?: string | null
  company?: string | null
  followers?: number
  following?: number
  public_repos?: number
  public_gists?: number
}

export function mapGitHubUser(user: GitHubApiUser): GitHubUserDto {
  return {
    id: user.id,
    login: user.login,
    name: user.name ?? null,
    avatarUrl: user.avatar_url,
    bio: user.bio ?? null,
    location: user.location ?? null,
    blog: user.blog ?? null,
    company: user.company ?? null,
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    publicRepos: user.public_repos ?? 0,
    publicGists: user.public_gists ?? 0,
    htmlUrl: user.html_url,
  }
}
