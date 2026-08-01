import { RepositoryListSkeleton } from '@/shared/components/skeletons/RepositoryListSkeleton'
import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import './AccountPageSkeleton.css'

function AccountProfileCardSkeleton() {
  return (
    <aside className="account-page-skeleton__profile" aria-hidden="true">
      <Skeleton
        variant="circular"
        width="10rem"
        height="10rem"
        className="account-page-skeleton__avatar"
      />

      <div className="account-page-skeleton__identity">
        <Skeleton variant="text" width="75%" height="1.75rem" />
        <Skeleton variant="text" width="45%" height="1rem" />
      </div>

      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="85%" />

      <div className="account-page-skeleton__counts">
        <Skeleton variant="text" width="6rem" height="0.875rem" />
        <Skeleton variant="text" width="5.5rem" height="0.875rem" />
      </div>

      <div className="account-page-skeleton__meta">
        <Skeleton variant="text" width="90%" height="0.875rem" />
        <Skeleton variant="text" width="75%" height="0.875rem" />
        <Skeleton variant="text" width="80%" height="0.875rem" />
      </div>

      <div className="account-page-skeleton__actions">
        <Skeleton variant="rectangular" width="100%" height="2.5rem" />
        <Skeleton variant="rectangular" width="100%" height="2.5rem" />
      </div>
    </aside>
  )
}

function AccountStatsGridSkeleton() {
  return (
    <section className="account-page-skeleton__stats" aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <article key={index} className="account-page-skeleton__stat glass-card">
          <Skeleton variant="circular" width="1.125rem" height="1.125rem" />
          <Skeleton variant="text" width="3rem" height="1.5rem" />
          <Skeleton variant="text" width="70%" height="0.75rem" />
        </article>
      ))}
    </section>
  )
}

function AccountOrganizationsSkeleton() {
  return (
    <section className="account-page-skeleton__organizations" aria-hidden="true">
      <Skeleton variant="text" width="10rem" height="1.125rem" />

      <div className="account-page-skeleton__organizations-grid">
        {Array.from({ length: 2 }, (_, index) => (
          <article key={index} className="account-page-skeleton__organization glass-card">
            <Skeleton variant="rectangular" width="2.75rem" height="2.75rem" />
            <div className="account-page-skeleton__organization-content">
              <Skeleton variant="text" width="60%" height="1rem" />
              <Skeleton variant="text" width="90%" height="0.8125rem" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function AccountRepositoriesSkeleton() {
  return (
    <section className="account-page-skeleton__repositories" aria-hidden="true">
      <div className="account-page-skeleton__repositories-header">
        <Skeleton variant="text" width="11rem" height="1.125rem" />
        <Skeleton variant="text" width="6rem" height="0.75rem" />
      </div>

      <div className="account-page-skeleton__repositories-list">
        <RepositoryListSkeleton count={6} variant="mobile" />
      </div>
    </section>
  )
}

export function AccountPageSkeleton() {
  return (
    <div
      className="account-page-skeleton"
      role="status"
      aria-label="Carregando conta"
    >
      <span className="visually-hidden">Carregando...</span>

      <div className="account-page-skeleton__grid">
        <AccountProfileCardSkeleton />

        <div className="account-page-skeleton__content">
          <AccountStatsGridSkeleton />
          <AccountOrganizationsSkeleton />
          <AccountRepositoriesSkeleton />
        </div>
      </div>
    </div>
  )
}
