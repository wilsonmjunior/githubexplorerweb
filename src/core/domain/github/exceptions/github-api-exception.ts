export class GitHubApiException extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'GitHubApiException'
    this.status = status
  }
}
