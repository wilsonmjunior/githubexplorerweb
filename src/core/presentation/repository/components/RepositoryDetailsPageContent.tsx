import Container from 'react-bootstrap/Container'
import { HomeFooter } from '@/core/presentation/home/components/HomeFooter'
import { HomeHeader } from '@/core/presentation/home/components/HomeHeader'
import { RepositoryActivityFeed } from '@/core/presentation/repository/components/RepositoryActivityFeed'
import { RepositoryHeader } from '@/core/presentation/repository/components/RepositoryHeader'
import { RepositoryMaintainersCard } from '@/core/presentation/repository/components/RepositoryMaintainersCard'
import { RepositoryMobileActivityFeed } from '@/core/presentation/repository/components/RepositoryMobileActivityFeed'
import { RepositoryMobileHeader } from '@/core/presentation/repository/components/RepositoryMobileHeader'
import { RepositoryMobileHero } from '@/core/presentation/repository/components/RepositoryMobileHero'
import { RepositoryMobileLanguages } from '@/core/presentation/repository/components/RepositoryMobileLanguages'
import { RepositoryMobileStatsGrid } from '@/core/presentation/repository/components/RepositoryMobileStatsGrid'
import { RepositoryStatsCard } from '@/core/presentation/repository/components/RepositoryStatsCard'
import { RepositoryTagsCard } from '@/core/presentation/repository/components/RepositoryTagsCard'
import { RepositoryPageSkeleton } from '@/shared/components/skeletons/RepositoryPageSkeleton'
import { useGithubRepository } from '@/core/presentation/repository/hooks/useGithubRepository'
import './RepositoryDetailsPageContent.css'

export function RepositoryDetailsPageContent() {
  const { details, isLoading, error } = useGithubRepository()

  return (
    <div className="repository-page d-flex flex-column min-vh-100">
      <div className="d-md-none">
        <RepositoryMobileHeader />
      </div>
      <div className="d-none d-md-block">
        <HomeHeader showDesktopSearch />
      </div>

      <main className="repository-page__main flex-grow-1">
        {isLoading ? (
          <Container fluid="lg" className="px-3 px-md-4">
            <RepositoryPageSkeleton />
          </Container>
        ) : null}

        {error ? (
          <Container fluid="lg" className="px-3 px-md-4">
            <p className="repository-page__error">{error}</p>
          </Container>
        ) : null}

        {!isLoading && !error && details ? (
          <>
            <div className="d-md-none repository-page__mobile">
              <RepositoryMobileHero repository={details.repository} />
              <RepositoryMobileStatsGrid repository={details.repository} />

              <div className="repository-page__mobile-github px-3">
                <a
                  href={details.repository.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="repository-page__mobile-github-btn"
                >
                  <i className="bi bi-terminal" aria-hidden="true" />
                  View on GitHub
                </a>
              </div>

              <RepositoryMobileLanguages languages={details.languages} />
              <RepositoryMobileActivityFeed activities={details.activities} />
            </div>

            <Container
              fluid="lg"
              className="repository-page__container d-none d-md-block px-3 px-md-4"
            >
              <RepositoryHeader repository={details.repository} />

              <div className="repository-page__bento">
                <div className="repository-page__stats">
                  <RepositoryStatsCard
                    repository={details.repository}
                    languages={details.languages}
                  />
                </div>

                <div className="repository-page__content">
                  <RepositoryActivityFeed activities={details.activities} />

                  <div className="repository-page__secondary">
                    <RepositoryMaintainersCard
                      contributors={details.contributors}
                    />
                    <RepositoryTagsCard repository={details.repository} />
                  </div>
                </div>
              </div>
            </Container>
          </>
        ) : null}
      </main>

      <HomeFooter />
    </div>
  )
}
