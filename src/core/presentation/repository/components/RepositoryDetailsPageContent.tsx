import Container from 'react-bootstrap/Container'
import { RepositoryActivityFeed } from '@/core/presentation/repository/components/RepositoryActivityFeed'
import { RepositoryHeader } from '@/core/presentation/repository/components/RepositoryHeader'
import { RepositoryMaintainersCard } from '@/core/presentation/repository/components/RepositoryMaintainersCard'
import { RepositoryMobileActivityFeed } from '@/core/presentation/repository/components/RepositoryMobileActivityFeed'
import { RepositoryMobileHero } from '@/core/presentation/repository/components/RepositoryMobileHero'
import { RepositoryMobileLanguages } from '@/core/presentation/repository/components/RepositoryMobileLanguages'
import { RepositoryMobileStatsGrid } from '@/core/presentation/repository/components/RepositoryMobileStatsGrid'
import { RepositoryStatsCard } from '@/core/presentation/repository/components/RepositoryStatsCard'
import { RepositoryTagsCard } from '@/core/presentation/repository/components/RepositoryTagsCard'
import { useGithubRepository } from '@/core/presentation/repository/hooks/useGithubRepository'
import { AppFooter } from '@/shared/components/AppFooter'
import { AppHeader } from '@/shared/components/AppHeader'
import { GitHubExternalLink } from '@/shared/components/GitHubExternalLink'
import { PageLayout } from '@/shared/components/PageLayout'
import { RepositoryPageSkeleton } from '@/shared/components/skeletons/RepositoryPageSkeleton'
import './RepositoryDetailsPageContent.css'

export function RepositoryDetailsPageContent() {
  const { details, isLoading, error } = useGithubRepository()

  return (
    <PageLayout
      className="repository-page"
      header={
        <>
          <AppHeader mobileOnly />
          <div className="d-none d-md-block">
            <AppHeader showDesktopSearch />
          </div>
        </>
      }
      footer={<AppFooter />}
    >
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
              <GitHubExternalLink
                href={details.repository.htmlUrl}
                icon="bi-terminal"
                className="repository-page__mobile-github-btn"
              />
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
    </PageLayout>
  )
}
