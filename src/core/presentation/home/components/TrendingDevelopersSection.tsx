import type { GitHubUserDto } from '@/core/domain/github'
import { Link } from 'react-router-dom'
import { DeveloperCard } from '@/core/presentation/home/components/DeveloperCard'
import { DeveloperCompactCard } from '@/core/presentation/home/components/DeveloperCompactCard'
import { DeveloperFeaturedCard } from '@/core/presentation/home/components/DeveloperFeaturedCard'
import { DeveloperListSkeleton } from '@/shared/components/skeletons/DeveloperListSkeleton'
import { APP_ROUTES } from '@/shared/constants/routes'
import './TrendingDevelopersSection.css'

type TrendingDevelopersSectionProps = {
  developers: GitHubUserDto[]
  isLoading: boolean
  error: string | null
}

export function TrendingDevelopersSection({
  developers,
  isLoading,
  error,
}: TrendingDevelopersSectionProps) {
  const [featured, ...compactDevelopers] = developers

  return (
    <section className="trending-section">
      <div className="trending-section__header">
        <h2 className="trending-section__title">
          <i className="bi bi-graph-up-arrow" aria-hidden="true" />
          Desenvolvedores em alta
        </h2>
        <Link to={APP_ROUTES.TRENDING_DEVELOPERS} className="trending-section__view-all">
          VER TODOS
        </Link>
      </div>

      {isLoading ? <DeveloperListSkeleton /> : null}

      {error ? (
        <p className="trending-section__state trending-section__error">
          {error}
        </p>
      ) : null}

      {!isLoading && !error ? (
        <>
          <div className="trending-section__list d-md-none">
            {developers.map((developer, index) => (
              <DeveloperCard
                key={developer.id}
                developer={developer}
                rank={index + 1}
              />
            ))}
          </div>

          <div className="trending-section__grid d-none d-md-grid">
            {featured ? (
              <div className="trending-section__featured">
                <DeveloperFeaturedCard developer={featured} />
              </div>
            ) : null}

            {compactDevelopers.map((developer) => (
              <DeveloperCompactCard
                key={developer.id}
                developer={developer}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}
