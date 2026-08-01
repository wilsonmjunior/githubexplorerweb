import type { RepositoryActivityDto } from '@/core/domain/github'
import { formatRelativeTime } from '@/shared/utils/format-relative-time'
import './RepositoryMobileActivityFeed.css'

type RepositoryMobileActivityFeedProps = {
  activities: RepositoryActivityDto[]
}

const ICONS = {
  commit: 'bi-git',
  merge: 'bi-diagram-3',
  issue: 'bi-exclamation-triangle',
} as const

const VARIANTS = {
  primary: 'repository-mobile-activity__icon-wrap--primary',
  tertiary: 'repository-mobile-activity__icon-wrap--tertiary',
  error: 'repository-mobile-activity__icon-wrap--secondary',
} as const

export function RepositoryMobileActivityFeed({
  activities,
}: RepositoryMobileActivityFeedProps) {
  return (
    <section className="repository-mobile-activity">
      <h3 className="repository-mobile-activity__title">Recent Activity</h3>

      <div className="repository-mobile-activity__list">
        {activities.map((activity, index) => (
          <article key={activity.id} className="repository-mobile-activity__item">
            <div className="repository-mobile-activity__timeline">
              <div
                className={`repository-mobile-activity__icon-wrap ${VARIANTS[activity.tagVariant]}`}
              >
                <i className={`bi ${ICONS[activity.type]}`} aria-hidden="true" />
              </div>
              {index < activities.length - 1 ? (
                <span className="repository-mobile-activity__line" aria-hidden="true" />
              ) : null}
            </div>

            <div className="repository-mobile-activity__content">
              <p className="repository-mobile-activity__text">
                <strong>{activity.title}</strong>
              </p>
              <p className="repository-mobile-activity__meta">
                <code>{activity.tag}</code> {activity.subtitle}
              </p>
              <time className="repository-mobile-activity__time">
                {formatRelativeTime(activity.occurredAt)}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
