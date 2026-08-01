import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import './ProfileHeroSkeleton.css'

export function ProfileHeroSkeleton() {
  return (
    <section className="profile-hero-skeleton" aria-hidden="true">
      <div className="profile-hero-skeleton__avatar-wrap">
        <Skeleton variant="circular" width="7rem" height="7rem" />
        <Skeleton
          variant="circular"
          width="1.75rem"
          height="1.75rem"
          className="profile-hero-skeleton__verified"
        />
      </div>

      <div className="profile-hero-skeleton__content">
        <Skeleton variant="text" width="12rem" height="2rem" />
        <Skeleton variant="text" width="6rem" height="1rem" />
        <Skeleton variant="text" width="100%" className="profile-hero-skeleton__bio" />
        <Skeleton variant="text" width="80%" />

        <div className="profile-hero-skeleton__stats">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="profile-hero-skeleton__stat">
              <Skeleton variant="text" width="3rem" height="1.25rem" />
              <Skeleton variant="text" width="4.5rem" height="0.75rem" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton
        variant="rectangular"
        className="profile-hero-skeleton__follow"
        height="2.75rem"
      />
    </section>
  )
}
