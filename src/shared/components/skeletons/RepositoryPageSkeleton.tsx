import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import './RepositoryPageSkeleton.css'

export function RepositoryPageSkeleton() {
  return (
    <div role="status" aria-label="Carregando repositório">
      <span className="visually-hidden">Carregando...</span>

      <div className="repository-page-skeleton__mobile d-md-none">
        <section className="repository-page-skeleton__hero">
          <Skeleton variant="text" width="70%" height="1.5rem" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="85%" />
        </section>

        <div className="repository-page-skeleton__stats-grid">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} variant="rectangular" height="4.5rem" />
          ))}
        </div>

        <Skeleton
          variant="rectangular"
          width="calc(100% - 1.5rem)"
          height="3rem"
          className="repository-page-skeleton__cta"
        />

        <section className="repository-page-skeleton__section">
          <Skeleton variant="text" width="8rem" height="1.25rem" />
          <Skeleton variant="rectangular" width="100%" height="0.5rem" />
          <Skeleton variant="text" width="60%" height="0.875rem" />
        </section>

        <section className="repository-page-skeleton__section">
          <Skeleton variant="text" width="6rem" height="1.25rem" />
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="repository-page-skeleton__activity">
              <Skeleton variant="circular" width="2rem" height="2rem" />
              <div className="repository-page-skeleton__activity-lines">
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="50%" />
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="repository-page-skeleton__desktop d-none d-md-block">
        <div className="repository-page-skeleton__header">
          <Skeleton variant="text" width="14rem" height="2rem" />
          <Skeleton variant="rectangular" width="9rem" height="2.5rem" />
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
      </div>
    </div>
  )
}
