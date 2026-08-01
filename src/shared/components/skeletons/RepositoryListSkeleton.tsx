import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import './RepositoryListSkeleton.css'

type RepositoryListSkeletonProps = {
  count?: number
  variant?: 'mobile' | 'desktop' | 'mixed'
}

function RepositoryCardSkeleton({
  variant,
}: {
  variant: 'mobile' | 'desktop'
}) {
  return (
    <article
      className={`repository-card-skeleton repository-card-skeleton--${variant}`}
    >
      <div className="repository-card-skeleton__header">
        <Skeleton variant="text" width="45%" height="1rem" />
        <Skeleton variant="rectangular" width="3.5rem" height="1.25rem" />
      </div>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="75%" />
      <div className="repository-card-skeleton__meta">
        <Skeleton variant="text" width="4rem" height="0.75rem" />
        <Skeleton variant="text" width="3rem" height="0.75rem" />
        <Skeleton variant="text" width="3rem" height="0.75rem" />
      </div>
    </article>
  )
}

export function RepositoryListSkeleton({
  count = 6,
  variant = 'mixed',
}: RepositoryListSkeletonProps) {
  if (variant === 'mobile') {
    return (
      <div
        className="repository-list-skeleton repository-list-skeleton--mobile"
        role="status"
        aria-label="Carregando repositórios"
      >
        <span className="visually-hidden">Carregando...</span>
        {Array.from({ length: count }, (_, index) => (
          <RepositoryCardSkeleton key={index} variant="mobile" />
        ))}
      </div>
    )
  }

  if (variant === 'desktop') {
    return (
      <div
        className="repository-list-skeleton repository-list-skeleton--desktop"
        role="status"
        aria-label="Carregando repositórios"
      >
        <span className="visually-hidden">Carregando...</span>
        {Array.from({ length: count }, (_, index) => (
          <RepositoryCardSkeleton key={index} variant="desktop" />
        ))}
      </div>
    )
  }

  return (
    <div role="status" aria-label="Carregando repositórios">
      <span className="visually-hidden">Carregando...</span>
      <div className="repository-list-skeleton repository-list-skeleton--mobile d-md-none">
        {Array.from({ length: count }, (_, index) => (
          <RepositoryCardSkeleton key={index} variant="mobile" />
        ))}
      </div>
      <div className="repository-list-skeleton repository-list-skeleton--desktop d-none d-md-grid">
        {Array.from({ length: count }, (_, index) => (
          <RepositoryCardSkeleton key={index} variant="desktop" />
        ))}
      </div>
    </div>
  )
}
