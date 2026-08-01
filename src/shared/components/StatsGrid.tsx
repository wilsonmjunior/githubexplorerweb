import './StatsGrid.css'

export type StatItem = {
  label: string
  value: string
  icon?: string
  iconVariant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'default'
}

type StatsGridProps = {
  items: StatItem[]
  variant?: 'glass' | 'bordered' | 'mobile' | 'hero'
  title?: string
  ariaLabel?: string
  className?: string
  columns?: 2 | 3 | 4
}

export function StatsGrid({
  items,
  variant = 'glass',
  title,
  ariaLabel,
  className = '',
  columns,
}: StatsGridProps) {
  const gridClassName = [
    'stats-grid',
    `stats-grid--${variant}`,
    columns ? `stats-grid--cols-${columns}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (variant === 'hero') {
    return (
      <div className={gridClassName} aria-label={ariaLabel}>
        {items.map((stat) => (
          <div key={stat.label} className="stats-grid__hero-item">
            <span className="stats-grid__hero-value">{stat.value}</span>
            <span className="stats-grid__hero-label">{stat.label}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className={gridClassName} aria-label={ariaLabel}>
      {title ? <h2 className="stats-grid__title">{title}</h2> : null}
      <div className="stats-grid__grid">
        {items.map((stat) => (
          <article
            key={stat.label}
            className={`stats-grid__item ${
              variant === 'glass' ? 'glass-card' : ''
            }`}
          >
            {stat.icon && variant !== 'mobile' ? (
              <i
                className={`bi ${stat.icon} stats-grid__icon ${
                  stat.iconVariant
                    ? `stats-grid__icon--${stat.iconVariant}`
                    : ''
                }`}
                aria-hidden="true"
              />
            ) : null}
            {variant === 'mobile' ? (
              <div className="stats-grid__mobile-label">
                {stat.icon ? (
                  <i className={`bi ${stat.icon}`} aria-hidden="true" />
                ) : null}
                <span>{stat.label}</span>
              </div>
            ) : null}
            <span className="stats-grid__value">{stat.value}</span>
            {variant !== 'mobile' ? (
              <span className="stats-grid__label">{stat.label}</span>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
