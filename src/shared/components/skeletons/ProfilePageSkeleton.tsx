import { ProfileSidebarSkeleton } from '@/shared/components/skeletons/ProfileSidebarSkeleton'
import { RepositoryListSkeleton } from '@/shared/components/skeletons/RepositoryListSkeleton'
import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import './ProfilePageSkeleton.css'

export function ProfileRepositoriesSkeleton() {
  return (
    <section className="profile-repositories-skeleton">
      <div className="profile-repositories-skeleton__header">
        <Skeleton variant="text" width="12rem" height="1.5rem" />
      </div>

      <div className="profile-repositories-skeleton__controls">
        <Skeleton variant="rectangular" width="100%" height="2.75rem" />
        <div className="profile-repositories-skeleton__filters">
          <Skeleton variant="rectangular" width="5rem" height="1.75rem" />
          <Skeleton variant="rectangular" width="6rem" height="1.75rem" />
          <Skeleton variant="rectangular" width="4rem" height="1.75rem" />
        </div>
      </div>

      <RepositoryListSkeleton count={4} />
    </section>
  )
}

export function ProfilePageSkeleton() {
  return (
    <div role="status" aria-label="Carregando perfil">
      <span className="visually-hidden">Carregando...</span>

      <div className="profile-page-skeleton">
        <ProfileSidebarSkeleton />
        <ProfileRepositoriesSkeleton />
      </div>
    </div>
  )
}
