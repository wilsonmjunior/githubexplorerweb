type CacheEntry<T> = {
  expiresAt: number
  value: T
}

const USER_CACHE_TTL_MS = 5 * 60 * 1000
const REPOSITORY_CACHE_TTL_MS = 2 * 60 * 1000

export class GitHubApiCache {
  private readonly entries = new Map<string, CacheEntry<unknown>>()
  private readonly inflight = new Map<string, Promise<unknown>>()

  async getUser<T>(login: string, fetcher: () => Promise<T>): Promise<T> {
    return this.getOrFetch(`user:${login}`, USER_CACHE_TTL_MS, fetcher)
  }

  async getRepositoryDetails<T>(
    owner: string,
    name: string,
    fetcher: () => Promise<T>,
  ): Promise<T> {
    return this.getOrFetch(
      `repo:${owner}/${name}`,
      REPOSITORY_CACHE_TTL_MS,
      fetcher,
    )
  }

  private async getOrFetch<T>(
    key: string,
    ttlMs: number,
    fetcher: () => Promise<T>,
  ): Promise<T> {
    const cached = this.entries.get(key)

    if (cached && cached.expiresAt > Date.now()) {
      return cached.value as T
    }

    const pending = this.inflight.get(key)

    if (pending) {
      return pending as Promise<T>
    }

    const promise = fetcher()
      .then((value) => {
        this.entries.set(key, {
          expiresAt: Date.now() + ttlMs,
          value,
        })
        this.inflight.delete(key)
        return value
      })
      .catch((error: unknown) => {
        this.inflight.delete(key)
        throw error
      })

    this.inflight.set(key, promise)
    return promise
  }
}
