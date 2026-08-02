import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import './RepositoryPageSkeleton.css'

export function RepositoryPageSkeleton() {
  return (
    <div role="status" aria-label="Carregando repositório">
      <span className="visually-hidden">Carregando...</span>

      <section className="repository-page-skeleton">
        <div className="repository-page-skeleton__hero">
          <Skeleton variant="text" width="40%" height="1.25rem" />
          <Skeleton variant="text" width="70%" height="2rem" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="85%" />
        </div>

        <div className="repository-page-skeleton__bento">
          <Skeleton variant="rectangular" height="12rem" />
          <div className="repository-page-skeleton__content">
            <Skeleton variant="rectangular" height="14rem" />
            <div className="repository-page-skeleton__secondary">
              <Skeleton variant="rectangular" height="10rem" />
              <Skeleton variant="rectangular" height="8rem" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
