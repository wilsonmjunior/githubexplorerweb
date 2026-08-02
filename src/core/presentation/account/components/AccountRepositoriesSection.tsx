import type { GitHubRepoSummaryDto } from '@/core/domain/github'
import { EmptyState } from '@/shared/components/EmptyState'
import { LoadMoreButton } from '@/shared/components/LoadMoreButton'
import { RepositoryListCard } from '@/shared/components/RepositoryListCard'
import { RepositoryListSkeleton } from '@/shared/components/skeletons/RepositoryListSkeleton'
import './AccountRepositoriesSection.css'

type AccountRepositoriesSectionProps = {
  repositories: GitHubRepoSummaryDto[]
  isLoading: boolean
  isLoadingMore: boolean
  hasMore: boolean
  onLoadMore: () => void
}

export function AccountRepositoriesSection({
  repositories,
  isLoading,
  isLoadingMore,
  hasMore,
  onLoadMore,
}: AccountRepositoriesSectionProps) {
  return (
    <section className="account-repositories">
      <div className="account-repositories__header">
        <h2 className="account-repositories__title">
          <i className="bi bi-folder2-open" aria-hidden="true" />
          Seus repositórios
        </h2>
        <span className="account-repositories__count">
          {repositories.length} carregados
        </span>
      </div>

      {isLoading ? (
        <RepositoryListSkeleton count={6} variant="mobile" />
      ) : (
        <div className="account-repositories__list">
          {repositories.map((repository) => (
            <RepositoryListCard
              key={repository.id}
              repository={repository}
            />
          ))}
        </div>
      )}

      {repositories.length === 0 && !isLoading ? (
        <EmptyState message="Nenhum repositório encontrado." />
      ) : null}

      {isLoadingMore ? (
        <div className="account-repositories__load-more-skeleton">
          <RepositoryListSkeleton count={3} variant="mobile" />
        </div>
      ) : null}

      {hasMore ? (
        <div className="account-repositories__load-more">
          <LoadMoreButton
            onClick={onLoadMore}
            isLoading={isLoadingMore}
            label="Carregar mais repositórios"
          />
        </div>
      ) : null}
    </section>
  )
}
