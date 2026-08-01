import type { GetAuthenticatedGitHubUserDetailsOutputDto } from '../types/get-authenticated-github-user-details-dto'
import type { GetAuthenticatedUserFollowingOutputDto } from '../types/get-authenticated-user-following-dto'
import type { GetGitHubRepositoryDetailsOutputDto, GetGitHubRepositoryInputDto } from '../types/get-github-repository-dto'
import type { GetTrendingDevelopersInputDto, GetTrendingDevelopersOutputDto } from '../types/get-trending-developers-dto'
import type { GetUserRepositoriesInputDto, GetUserRepositoriesOutputDto } from '../types/get-user-repositories-dto'
import type { SearchGitHubRepositoriesInputDto, SearchGitHubRepositoriesOutputDto } from '../types/search-github-repositories-dto'
import type { SearchGitHubUsersInputDto, SearchGitHubUsersOutputDto } from '../types/search-github-users-dto'
import type { GitHubUserDto } from '../types/github-user-dto'

export interface GitHubClient {
  searchUsers(input: SearchGitHubUsersInputDto): Promise<SearchGitHubUsersOutputDto>
  searchRepositories(
    input: SearchGitHubRepositoriesInputDto,
  ): Promise<SearchGitHubRepositoriesOutputDto>
  getUser(login: string): Promise<GitHubUserDto>
  getAuthenticatedUser(): Promise<GitHubUserDto | null>
  getAuthenticatedUserDetails(): Promise<GetAuthenticatedGitHubUserDetailsOutputDto | null>
  getAuthenticatedUserFollowing(): Promise<GetAuthenticatedUserFollowingOutputDto>
  getTrendingDevelopers(
    input: GetTrendingDevelopersInputDto,
  ): Promise<GetTrendingDevelopersOutputDto>
  getUserRepositories(
    input: GetUserRepositoriesInputDto,
  ): Promise<GetUserRepositoriesOutputDto>
  getRepositoryDetails(
    input: GetGitHubRepositoryInputDto,
  ): Promise<GetGitHubRepositoryDetailsOutputDto>
}
