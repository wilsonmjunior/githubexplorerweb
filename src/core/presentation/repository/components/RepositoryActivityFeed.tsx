import type { RepositoryActivityDto } from '@/core/domain/github'
import {
  REPOSITORY_ACTIVITY_ICONS,
  REPOSITORY_ACTIVITY_MOBILE_ICONS,
  REPOSITORY_ACTIVITY_MOBILE_VARIANTS,
} from '@/shared/constants/repository-activity'
import { formatRelativeTime } from '@/shared/utils/format-relative-time'
import './RepositoryActivityFeed.css'

type RepositoryActivityFeedProps = {
  activities: RepositoryActivityDto[]
}

export function RepositoryActivityFeed({ activities }: RepositoryActivityFeedProps) {
  return (
    <section className="repository-activity glass-card">
      <div className="repository-activity__header">
        <h2 className="repository-activity__title">Atividade recente</h2>
        <button type="button" className="repository-activity__view-all" disabled>
          Ver tudo
        </button>
      </div>

      <div className="repository-activity__list">
        {activities.map((activity, index) => (
          <article key={activity.id} className="repository-activity__item">
            <div className="repository-activity__timeline">
              <div
                className={`repository-activity__icon-wrap ${REPOSITORY_ACTIVITY_MOBILE_VARIANTS[activity.tagVariant]}`}
              >
                <i
                  className={`bi ${REPOSITORY_ACTIVITY_MOBILE_ICONS[activity.type]}`}
                  aria-hidden="true"
                />
              </div>
              {index < activities.length - 1 ? (
                <span className="repository-activity__line" aria-hidden="true" />
              ) : null}
            </div>

            <i
              className={`bi ${REPOSITORY_ACTIVITY_ICONS[activity.type]} repository-activity__icon repository-activity__icon--${activity.tagVariant}`}
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
              <p className="repository-activity__mobile-text">
                <strong>{activity.title}</strong>
              </p>
              <p className="repository-activity__mobile-meta">
                <code>{activity.tag}</code> {activity.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
