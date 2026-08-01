import type { RepositoryLanguageDto } from '@/core/domain/github'
import './LanguageDistributionBar.css'

type LanguageDistributionBarProps = {
  languages: RepositoryLanguageDto[]
  variant?: 'legend' | 'list'
  title?: string
  className?: string
}

export function LanguageDistributionBar({
  languages,
  variant = 'legend',
  title,
  className = '',
}: LanguageDistributionBarProps) {
  if (languages.length === 0) {
    return null
  }

  if (variant === 'list') {
    return (
      <section
        className={`language-distribution language-distribution--list ${className}`.trim()}
      >
        {title ? (
          <h3 className="language-distribution__title">{title}</h3>
        ) : null}

        <div className="language-distribution__bar">
          {languages.map((language) => (
            <span
              key={language.name}
              className="language-distribution__segment"
              style={{
                width: `${language.percentage}%`,
                backgroundColor: language.color,
              }}
            />
          ))}
        </div>

        <div className="language-distribution__list">
          {languages.map((language) => (
            <div key={language.name} className="language-distribution__row">
              <span className="language-distribution__name">
                <span
                  className="language-distribution__dot"
                  style={{ backgroundColor: language.color }}
                />
                {language.name}
              </span>
              <span className="language-distribution__percent">
                {language.percentage}%
              </span>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className={`language-distribution language-distribution--legend ${className}`.trim()}>
      {title ? (
        <h3 className="language-distribution__title">{title}</h3>
      ) : null}

      <div className="language-distribution__bar language-distribution__bar--rounded">
        {languages.map((language) => (
          <span
            key={language.name}
            className="language-distribution__segment"
            style={{
              width: `${language.percentage}%`,
              backgroundColor: language.color,
            }}
          />
        ))}
      </div>

      <div className="language-distribution__legend">
        {languages.map((language) => (
          <span key={language.name} className="language-distribution__legend-item">
            <span
              className="language-distribution__dot"
              style={{ backgroundColor: language.color }}
            />
            {language.name} {language.percentage}%
          </span>
        ))}
      </div>
    </div>
  )
}
