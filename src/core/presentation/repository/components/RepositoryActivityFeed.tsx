import type { RepositoryActivityDto } from '@/core/domain/github'
import { formatRelativeTime } from '@/shared/utils/format-relative-time'
import './RepositoryActivityFeed.css'

type RepositoryActivityFeedProps = {
  activities: RepositoryActivityDto[]
}

const ICONS = {
  commit: 'bi-git',
  merge: 'bi-diagram-3',
  issue: 'bi-exclamation-circle',
} as const

export function RepositoryActivityFeed({ activities }: RepositoryActivityFeedProps) {
  return (
    <section className="repository-activity glass-card">
      <div className="repository-activity__header">
        <h2 className="repository-activity__title">Recent Activity</h2>
        <button type="button" className="repository-activity__view-all">
          View All
        </button>
      </div>

      <div className="repository-activity__list">
        {activities.map((activity) => (
          <article key={activity.id} className="repository-activity__item">
            <i
              className={`bi ${ICONS[activity.type]} repository-activity__icon repository-activity__icon--${activity.tagVariant}`}
              aria-hidden="true"
            />
            <div className="repository-activity__content">
              <div className="repository-activity__row">
                <h3 className="repository-activity__item-title">{activity.title}</h3>
                <time className="repository-activity__time">
                  {formatRelativeTime(activity.occurredAt)}
                </time>
              </div>
              <div className="repository-activity__meta">
                <span
                  className={`repository-activity__tag repository-activity__tag--${activity.tagVariant}`}
                >
                  {activity.tag}
                </span>
                <span>{activity.subtitle}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
