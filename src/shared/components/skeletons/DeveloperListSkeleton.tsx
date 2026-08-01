import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import './DeveloperListSkeleton.css'

type DeveloperListSkeletonProps = {
  count?: number
  layout?: 'featured' | 'compact'
}

function DeveloperCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <article className="developer-card-skeleton glass-card">
      <Skeleton
        variant="circular"
        width={featured ? '4rem' : '3.5rem'}
        height={featured ? '4rem' : '3.5rem'}
      />
      <div className="developer-card-skeleton__content">
        <Skeleton variant="text" width="55%" height="1rem" />
        <Skeleton variant="text" width="80%" />
        <div className="developer-card-skeleton__stats">
          <Skeleton variant="text" width="3.5rem" height="0.75rem" />
          <Skeleton variant="text" width="3.5rem" height="0.75rem" />
        </div>
      </div>
    </article>
  )
}

function DeveloperCompactCardSkeleton() {
  return (
    <article className="developer-compact-skeleton glass-card">
      <Skeleton variant="circular" width="4rem" height="4rem" />
      <Skeleton variant="text" width="70%" height="1.125rem" />
      <Skeleton variant="text" width="50%" height="0.75rem" />
      <div className="developer-compact-skeleton__tags">
        <Skeleton variant="rectangular" width="4rem" height="1.25rem" />
        <Skeleton variant="rectangular" width="3.5rem" height="1.25rem" />
      </div>
    </article>
  )
}

function DeveloperFeaturedCardSkeleton() {
  return (
    <article className="developer-featured-skeleton glass-card">
      <Skeleton variant="circular" width="5rem" height="5rem" />
      <Skeleton variant="text" width="60%" height="1.5rem" />
      <Skeleton variant="text" width="40%" height="0.875rem" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="85%" />
      <div className="developer-featured-skeleton__stats">
        <Skeleton variant="rectangular" width="4rem" height="2.5rem" />
        <Skeleton variant="rectangular" width="4rem" height="2.5rem" />
        <Skeleton variant="rectangular" width="4rem" height="2.5rem" />
      </div>
    </article>
  )
}

export function DeveloperListSkeleton({
  count = 5,
  layout = 'featured',
}: DeveloperListSkeletonProps) {
  if (layout === 'compact') {
    return (
      <div
        className="developer-list-skeleton"
        role="status"
        aria-label="Carregando desenvolvedores"
      >
        <span className="visually-hidden">Carregando...</span>
        <div className="developer-list-skeleton__list d-md-none">
          {Array.from({ length: count }, (_, index) => (
            <DeveloperCardSkeleton key={index} />
          ))}
        </div>
        <div className="developer-list-skeleton__grid-compact d-none d-md-grid">
          {Array.from({ length: count }, (_, index) => (
            <DeveloperCompactCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  const compactCount = Math.max(count - 1, 4)

  return (
    <div
      className="developer-list-skeleton"
      role="status"
      aria-label="Carregando desenvolvedores"
    >
      <span className="visually-hidden">Carregando...</span>

      <div className="developer-list-skeleton__list d-md-none">
        {Array.from({ length: count }, (_, index) => (
          <DeveloperCardSkeleton key={index} featured={index === 0} />
        ))}
      </div>

      <div className="developer-list-skeleton__grid d-none d-md-grid">
        <div className="developer-list-skeleton__featured">
          <DeveloperFeaturedCardSkeleton />
        </div>
        {Array.from({ length: compactCount }, (_, index) => (
          <DeveloperCompactCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
