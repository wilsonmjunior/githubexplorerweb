import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import './ProfileSidebarSkeleton.css'

export function ProfileSidebarSkeleton() {
  return (
    <aside className="profile-sidebar-skeleton" aria-hidden="true">
      <Skeleton variant="circular" className="profile-sidebar-skeleton__avatar" />
      <Skeleton variant="text" width="75%" height="1.5rem" />
      <Skeleton variant="text" width="50%" height="1rem" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="70%" />

      <div className="profile-sidebar-skeleton__counts">
        <Skeleton variant="text" width="6rem" height="0.75rem" />
        <Skeleton variant="text" width="5rem" height="0.75rem" />
      </div>

      <div className="profile-sidebar-skeleton__meta">
        <Skeleton variant="text" width="85%" height="0.875rem" />
        <Skeleton variant="text" width="70%" height="0.875rem" />
        <Skeleton variant="text" width="60%" height="0.875rem" />
      </div>
    </aside>
  )
}
