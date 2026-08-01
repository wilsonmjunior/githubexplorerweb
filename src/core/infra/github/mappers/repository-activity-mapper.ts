import type { RepositoryActivityDto } from '@/core/domain/github'

type GitHubApiCommit = {
  sha: string
  commit: {
    message: string
    author: {
      date: string
    }
  }
  author: {
    login?: string
  } | null
}

export function mapRepositoryCommits(
  commits: GitHubApiCommit[],
): RepositoryActivityDto[] {
  return commits.map((commit) => {
    const title = commit.commit.message.split('\n')[0]
    const authorLogin = commit.author?.login ?? 'unknown'

    return {
      id: commit.sha,
      type: 'commit',
      title,
      subtitle: `authored by @${authorLogin}`,
      tag: commit.sha.slice(0, 7),
      tagVariant: 'primary',
      occurredAt: commit.commit.author.date,
    }
  })
}
