import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import './TrendingDevelopersPageSkeleton.css'

type TrendingDevelopersPageSkeletonProps = {
  count?: number
  variant?: 'page' | 'list'
}

function TrendingDeveloperCardSkeleton() {
  return (
    <article className="trending-dev-card-skeleton glass-card">
      <div className="trending-dev-card-skeleton__avatar-wrap">
        <Skeleton variant="circular" width="3.5rem" height="3.5rem" />
        <Skeleton
          variant="rectangular"
          width="1.75rem"
          height="1rem"
          className="trending-dev-card-skeleton__rank"
        />
      </div>

      <div className="trending-dev-card-skeleton__content">
        <Skeleton variant="text" width="55%" height="1rem" />
        <Skeleton variant="text" width="80%" />
        <div className="trending-dev-card-skeleton__stats">
          <Skeleton variant="text" width="3.5rem" height="0.75rem" />
          <Skeleton variant="text" width="3.5rem" height="0.75rem" />
        </div>
      </div>
    </article>
  )
}

function TrendingDeveloperCompactCardSkeleton() {
  return (
    <article className="trending-dev-compact-skeleton glass-card">
      <Skeleton variant="circular" width="4rem" height="4rem" />
      <Skeleton variant="text" width="70%" height="1.25rem" />
      <Skeleton variant="text" width="50%" height="0.8125rem" />
      <div className="trending-dev-compact-skeleton__tags">
        <Skeleton variant="rectangular" width="4rem" height="1.25rem" />
        <Skeleton variant="rectangular" width="3.5rem" height="1.25rem" />
      </div>
    </article>
  )
}

function TrendingDevelopersListSkeleton({ count }: { count: number }) {
  return (
    <>
      <div className="trending-developers-page-skeleton__list d-md-none">
        {Array.from({ length: count }, (_, index) => (
          <TrendingDeveloperCardSkeleton key={index} />
        ))}
      </div>

      <div className="trending-developers-page-skeleton__grid d-none d-md-grid">
        {Array.from({ length: count }, (_, index) => (
          <TrendingDeveloperCompactCardSkeleton key={index} />
        ))}
      </div>
    </>
  )
}

export function TrendingDevelopersPageSkeleton({
  count = 8,
  variant = 'page',
}: TrendingDevelopersPageSkeletonProps) {
  if (variant === 'list') {
    return (
      <div
        className="trending-developers-page-skeleton"
        role="status"
        aria-label="Carregando mais desenvolvedores"
      >
        <span className="visually-hidden">Carregando...</span>
        <TrendingDevelopersListSkeleton count={count} />
      </div>
    )
  }

  return (
    <div
      className="trending-developers-page-skeleton"
      role="status"
      aria-label="Carregando desenvolvedores em alta"
    >
      <span className="visually-hidden">Carregando...</span>

      <div className="trending-developers-page-skeleton__header">
        <div className="trending-developers-page-skeleton__title-group">
          <Skeleton variant="text" width="5rem" height="0.875rem" />
          <Skeleton variant="text" width="14rem" height="1.75rem" />
        </div>
        <Skeleton variant="text" width="8rem" height="0.75rem" />
      </div>

      <TrendingDevelopersListSkeleton count={count} />

      <div className="trending-developers-page-skeleton__load-more">
        <Skeleton variant="rectangular" width="9rem" height="2.75rem" />
      </div>
    </div>
  )
}
