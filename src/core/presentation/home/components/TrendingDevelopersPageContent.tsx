import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { DeveloperCard } from '@/core/presentation/home/components/DeveloperCard'
import { DeveloperCompactCard } from '@/core/presentation/home/components/DeveloperCompactCard'
import { useTrendingDevelopersList } from '@/core/presentation/home/hooks/useTrendingDevelopersList'
import { AppFooter } from '@/shared/components/AppFooter'
import { AppHeader } from '@/shared/components/AppHeader'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { LoadMoreButton } from '@/shared/components/LoadMoreButton'
import { PageLayout } from '@/shared/components/PageLayout'
import { TrendingDevelopersPageSkeleton } from '@/shared/components/skeletons/TrendingDevelopersPageSkeleton'
import { APP_ROUTES } from '@/shared/constants/routes'
import './TrendingDevelopersPageContent.css'

export function TrendingDevelopersPageContent() {
  const {
    developers,
    totalCount,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
  } = useTrendingDevelopersList()

  return (
    <PageLayout
      className="trending-developers-page"
      header={<AppHeader />}
      footer={<AppFooter />}
    >
      <Container fluid="lg" className="px-3 px-md-4 py-4">
        <div className="trending-developers-page__header">
          <div>
            <Link
              to={APP_ROUTES.HOME}
              className="trending-developers-page__back"
            >
              <i className="bi bi-arrow-left" aria-hidden="true" />
              Voltar
            </Link>
            <h1 className="trending-developers-page__title">
              <i className="bi bi-graph-up-arrow" aria-hidden="true" />
              Desenvolvedores em alta
            </h1>
          </div>

          {!isLoading && totalCount > 0 ? (
            <span className="trending-developers-page__count">
              {totalCount.toLocaleString('pt-BR')} desenvolvedores
            </span>
          ) : null}
        </div>

        {isLoading ? <TrendingDevelopersPageSkeleton count={8} /> : null}

        {error ? (
          <ErrorMessage
            message={error}
            className="trending-developers-page__state trending-developers-page__error"
          />
        ) : null}

        {!isLoading && !error ? (
          <>
            <div className="trending-developers-page__list d-md-none">
              {developers.map((developer, index) => (
                <DeveloperCard
                  key={developer.id}
                  developer={developer}
                  rank={index + 1}
                />
              ))}
            </div>

            <div className="trending-developers-page__grid d-none d-md-grid">
              {developers.map((developer) => (
                <DeveloperCompactCard
                  key={developer.id}
                  developer={developer}
                />
              ))}
            </div>

            {developers.length === 0 ? (
              <p className="trending-developers-page__state">
                Nenhum desenvolvedor encontrado.
              </p>
            ) : null}

            {isLoadingMore ? (
              <TrendingDevelopersPageSkeleton count={4} variant="list" />
            ) : null}

            {hasMore ? (
              <div className="trending-developers-page__load-more">
                <LoadMoreButton
                  onClick={loadMore}
                  isLoading={isLoadingMore}
                  label="Carregar mais"
                />
              </div>
            ) : null}
          </>
        ) : null}
      </Container>
    </PageLayout>
  )
}
