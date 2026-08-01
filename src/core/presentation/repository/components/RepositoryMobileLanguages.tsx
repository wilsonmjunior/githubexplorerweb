import type { RepositoryLanguageDto } from '@/core/domain/github'
import './RepositoryMobileLanguages.css'

type RepositoryMobileLanguagesProps = {
  languages: RepositoryLanguageDto[]
}

export function RepositoryMobileLanguages({
  languages,
}: RepositoryMobileLanguagesProps) {
  if (languages.length === 0) {
    return null
  }

  return (
    <section className="repository-mobile-languages">
      <h3 className="repository-mobile-languages__title">Languages</h3>

      <div className="repository-mobile-languages__bar">
        {languages.map((language) => (
          <span
            key={language.name}
            className="repository-mobile-languages__segment"
            style={{
              width: `${language.percentage}%`,
              backgroundColor: language.color,
            }}
          />
        ))}
      </div>

      <div className="repository-mobile-languages__list">
        {languages.map((language) => (
          <div key={language.name} className="repository-mobile-languages__row">
            <span className="repository-mobile-languages__name">
              <span
                className="repository-mobile-languages__dot"
                style={{ backgroundColor: language.color }}
              />
              {language.name}
            </span>
            <span className="repository-mobile-languages__percent">
              {language.percentage}%
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
