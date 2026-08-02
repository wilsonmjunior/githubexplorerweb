export type GitHubUserDto = {
  id: number
  login: string
  name: string | null
  avatarUrl: string
  bio: string | null
  location: string | null
  blog: string | null
  company: string | null
  email: string | null
  followers: number
  following: number
  publicRepos: number
  publicGists: number
  htmlUrl: string
}
