import type { GitHubClient } from '@/core/domain/github'
import type {
  GetGitHubRepositoryDetailsOutputDto,
  GetGitHubRepositoryInputDto,
  GetTrendingDevelopersInputDto,
  GetTrendingDevelopersOutputDto,
  GetUserRepositoriesInputDto,
  GetUserRepositoriesOutputDto,
  GitHubUserDto,
  RepositoryContributorDto,
  SearchGitHubRepositoriesInputDto,
  SearchGitHubRepositoriesOutputDto,
  SearchGitHubUsersInputDto,
  SearchGitHubUsersOutputDto,
} from '@/core/domain/github'
import { GitHubApiException } from '@/core/domain/github/exceptions/github-api-exception'
import { createGitHubHttpClient } from '@/core/infra/github/http/create-github-http-client'
import { mapRepositoryCommits } from '@/core/infra/github/mappers/repository-activity-mapper'
import { mapGitHubRepoSummary } from '@/core/infra/github/mappers/github-repo-summary-mapper'
import { mapGitHubRepository } from '@/core/infra/github/mappers/github-repository-mapper'
import { mapGitHubUser } from '@/core/infra/github/mappers/github-user-mapper'
import { mapRepositoryLanguages } from '@/core/infra/github/mappers/repository-language-mapper'
import type { AxiosInstance } from 'axios'

type GitHubSearchUsersResponse = {
  total_count: number
  items: Array<{
    id: number
    login: string
    avatar_url: string
    html_url: string
  }>
}

type GitHubSearchRepositoriesResponse = {
  total_count: number
  items: Parameters<typeof mapGitHubRepoSummary>[0][]
}

type GitHubContributorResponse = {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

function buildRepositorySearchQuery(
  input: SearchGitHubRepositoriesInputDto,
): string {
  const parts: string[] = []

  if (input.query.trim()) {
    parts.push(input.query.trim())
  }

  if (input.ownerLogin) {
    parts.push(`user:${input.ownerLogin}`)
  }

  return parts.join(' ').trim()
}

export class GitHubApiClient implements GitHubClient {
  private readonly http: AxiosInstance

  constructor(httpClient?: AxiosInstance) {
    this.http = httpClient ?? createGitHubHttpClient()
  }

  async searchUsers(
    input: SearchGitHubUsersInputDto,
  ): Promise<SearchGitHubUsersOutputDto> {
    const { data } = await this.http.get<GitHubSearchUsersResponse>(
      '/search/users',
      {
        params: {
          q: `${input.query} in:login`,
          per_page: input.perPage ?? 10,
          page: input.page ?? 1,
        },
      },
    )

    const users = await Promise.all(
      data.items.map((item) => this.getUser(item.login)),
    )

    return {
      users,
      totalCount: data.total_count,
    }
  }

  async searchRepositories(
    input: SearchGitHubRepositoriesInputDto,
  ): Promise<SearchGitHubRepositoriesOutputDto> {
    const searchQuery = buildRepositorySearchQuery(input)

    const { data } = await this.http.get<GitHubSearchRepositoriesResponse>(
      '/search/repositories',
      {
        params: {
          q: searchQuery,
          sort: input.sort ?? 'stars',
          order: 'desc',
          per_page: input.perPage ?? 10,
          page: input.page ?? 1,
        },
      },
    )

    return {
      repositories: data.items.map(mapGitHubRepoSummary),
      totalCount: data.total_count,
    }
  }

  async getUser(login: string): Promise<GitHubUserDto> {
    const { data } = await this.http.get(`/users/${login}`)
    return mapGitHubUser(data)
  }

  async getAuthenticatedUser(): Promise<GitHubUserDto | null> {
    const token = import.meta.env.VITE_GITHUB_TOKEN?.trim()

    if (!token) {
      return null
    }

    try {
      const { data } = await this.http.get('/user')
      return mapGitHubUser(data)
    } catch (error) {
      if (
        error instanceof GitHubApiException &&
        (error.status === 401 || error.status === 403)
      ) {
        return null
      }

      throw error
    }
  }

  async getTrendingDevelopers(
    input: GetTrendingDevelopersInputDto,
  ): Promise<GetTrendingDevelopersOutputDto> {
    const perPage = input.perPage ?? 5
    const page = input.page ?? 1
    const { data } = await this.http.get<GitHubSearchUsersResponse>(
      '/search/users',
      {
        params: {
          q: 'followers:>5000',
          sort: 'followers',
          order: 'desc',
          per_page: perPage,
          page,
        },
      },
    )

    const developers = await Promise.all(
      data.items.map((item) => this.getUser(item.login)),
    )

    return { developers, totalCount: data.total_count }
  }

  async getUserRepositories(
    input: GetUserRepositoriesInputDto,
  ): Promise<GetUserRepositoriesOutputDto> {
    const { data } = await this.http.get('/users/' + input.login + '/repos', {
      params: {
        sort: input.sort ?? 'updated',
        per_page: input.perPage ?? 10,
        page: input.page ?? 1,
      },
    })

    return {
      repositories: data.map(mapGitHubRepoSummary),
    }
  }

  async getRepositoryDetails(
    input: GetGitHubRepositoryInputDto,
  ): Promise<GetGitHubRepositoryDetailsOutputDto> {
    const repoPath = `/repos/${input.owner}/${input.name}`

    const [
      repositoryResult,
      languagesResult,
      commitsResult,
      contributorsResult,
    ] = await Promise.allSettled([
      this.http.get(repoPath),
      this.http.get<Record<string, number>>(`${repoPath}/languages`),
      this.http.get(`${repoPath}/commits`, { params: { per_page: 3 } }),
      this.http.get<GitHubContributorResponse[]>(`${repoPath}/contributors`, {
        params: { per_page: 4 },
      }),
    ])

    if (repositoryResult.status === 'rejected') {
      throw repositoryResult.reason
    }

    const languages =
      languagesResult.status === 'fulfilled'
        ? mapRepositoryLanguages(languagesResult.value.data)
        : []

    const activities =
      commitsResult.status === 'fulfilled'
        ? mapRepositoryCommits(commitsResult.value.data)
        : []

    const contributors: RepositoryContributorDto[] =
      contributorsResult.status === 'fulfilled'
        ? contributorsResult.value.data.map((contributor) => ({
            login: contributor.login,
            avatarUrl: contributor.avatar_url,
            htmlUrl: contributor.html_url,
            contributions: contributor.contributions,
          }))
        : []

    return {
      repository: mapGitHubRepository(repositoryResult.value.data),
      languages,
      activities,
      contributors,
    }
  }
}
