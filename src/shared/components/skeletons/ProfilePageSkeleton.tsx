import { ProfileHeroSkeleton } from '@/shared/components/skeletons/ProfileHeroSkeleton'
import { ProfileSidebarSkeleton } from '@/shared/components/skeletons/ProfileSidebarSkeleton'
import { RepositoryListSkeleton } from '@/shared/components/skeletons/RepositoryListSkeleton'
import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import './ProfilePageSkeleton.css'

type ProfileRepositoriesSkeletonProps = {
  variant?: 'mobile' | 'desktop'
}

export function ProfileRepositoriesSkeleton({
  variant = 'mobile',
}: ProfileRepositoriesSkeletonProps) {
  if (variant === 'desktop') {
    return (
      <section className="profile-repositories-skeleton profile-repositories-skeleton--desktop">
        <div className="profile-repositories-skeleton__header">
          <Skeleton variant="text" width="12rem" height="1.5rem" />
          <Skeleton variant="rectangular" width="7rem" height="2rem" />
        </div>
        <RepositoryListSkeleton count={6} variant="mobile" />
      </section>
    )
  }

  return (
    <section className="profile-repositories-skeleton profile-repositories-skeleton--mobile">
      <div className="profile-repositories-skeleton__controls">
        <Skeleton variant="rectangular" width="100%" height="2.75rem" />
        <div className="profile-repositories-skeleton__chips">
          <Skeleton variant="rectangular" width="5rem" height="1.75rem" />
          <Skeleton variant="rectangular" width="6rem" height="1.75rem" />
          <Skeleton variant="rectangular" width="4rem" height="1.75rem" />
        </div>
      </div>
      <div className="profile-repositories-skeleton__list">
        <RepositoryListSkeleton count={4} variant="mobile" />
      </div>
    </section>
  )
}

export function ProfilePageSkeleton() {
  return (
    <div role="status" aria-label="Carregando perfil">
      <span className="visually-hidden">Carregando...</span>

      <div className="d-md-none">
        <div className="profile-page-skeleton__hero-wrap px-3">
          <ProfileHeroSkeleton />
        </div>
        <ProfileRepositoriesSkeleton variant="mobile" />
      </div>

      <div className="profile-page-skeleton__desktop d-none d-md-block">
        <div className="profile-page-skeleton__grid">
          <ProfileSidebarSkeleton />
          <ProfileRepositoriesSkeleton variant="desktop" />
        </div>
      </div>
    </div>
  )
}
