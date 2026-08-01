import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { BottomNav } from '@/core/presentation/home/components/BottomNav'
import { DeveloperCard } from '@/core/presentation/home/components/DeveloperCard'
import { DeveloperCompactCard } from '@/core/presentation/home/components/DeveloperCompactCard'
import { HomeFooter } from '@/core/presentation/home/components/HomeFooter'
import { HomeHeader } from '@/core/presentation/home/components/HomeHeader'
import { useTrendingDevelopersList } from '@/core/presentation/home/hooks/useTrendingDevelopersList'
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
    <div className="trending-developers-page d-flex flex-column min-vh-100">
      <HomeHeader />

      <main className="trending-developers-page__main flex-grow-1">
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
                Trending Developers
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
            <p className="trending-developers-page__state trending-developers-page__error">
              {error}
            </p>
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
                  <button
                    type="button"
                    className="trending-developers-page__load-more-btn"
                    onClick={loadMore}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? 'Carregando...' : 'Carregar mais'}
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </Container>
      </main>

      <HomeFooter />
      <BottomNav />
      <div className="bottom-nav-spacer d-md-none" aria-hidden="true" />
    </div>
  )
}
