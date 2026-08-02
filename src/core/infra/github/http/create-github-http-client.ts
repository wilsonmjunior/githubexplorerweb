import axios, { type AxiosInstance } from 'axios'
import { GitHubApiException } from '@/core/domain/github/exceptions/github-api-exception'

const GITHUB_API_BASE_URL = 'https://api.github.com'

function getGithubToken(): string | undefined {
  return import.meta.env.VITE_GITHUB_TOKEN?.trim() || undefined
}

export function createGitHubHttpClient(): AxiosInstance {
  const token = getGithubToken()

  const client = axios.create({
    baseURL: GITHUB_API_BASE_URL,
    timeout: 15_000,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isCancel(error)) {
        return Promise.reject(error)
      }

      if (!axios.isAxiosError(error)) {
        return Promise.reject(
          new GitHubApiException('Erro inesperado ao comunicar com o GitHub.', 0),
        )
      }

      if (error.code === 'ERR_CANCELED') {
        return Promise.reject(error)
      }

      const status = error.response?.status ?? 0
      const message = getGithubErrorMessage(status, error.response?.data)

      return Promise.reject(new GitHubApiException(message, status))
    },
  )

  return client
}

function getGithubErrorMessage(status: number, data: unknown): string {
  if (status === 403) {
    return 'Limite de requisições do GitHub atingido. Tente novamente em alguns minutos.'
  }

  if (status === 404) {
    return 'Recurso não encontrado no GitHub.'
  }

  if (status === 422) {
    return 'Consulta inválida para a API do GitHub.'
  }

  if (typeof data === 'object' && data !== null && 'message' in data) {
    const apiMessage = data.message

    if (typeof apiMessage === 'string' && apiMessage.length > 0) {
      return apiMessage
    }
  }

  if (status >= 500) {
    return 'O GitHub está indisponível no momento.'
  }

  return 'Não foi possível completar a requisição ao GitHub.'
}
