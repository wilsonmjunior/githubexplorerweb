import Container from 'react-bootstrap/Container'
import { AccountOrganizations } from '@/core/presentation/account/components/AccountOrganizations'
import { AccountProfileCard } from '@/core/presentation/account/components/AccountProfileCard'
import { AccountRepositoriesSection } from '@/core/presentation/account/components/AccountRepositoriesSection'
import { AccountStatsGrid } from '@/core/presentation/account/components/AccountStatsGrid'
import { AccountPageSkeleton } from '@/shared/components/skeletons/AccountPageSkeleton'
import { useAuthenticatedGithubAccount } from '@/core/presentation/account/hooks/useAuthenticatedGithubAccount'
import { HomeFooter } from '@/core/presentation/home/components/HomeFooter'
import { HomeHeader } from '@/core/presentation/home/components/HomeHeader'
import './AccountPageContent.css'

export function AccountPageContent() {
  const {
    user,
    organizations,
    repositories,
    isLoading,
    isLoadingMore,
    error,
    isUnauthenticated,
    hasMore,
    loadMore,
  } = useAuthenticatedGithubAccount()

  return (
    <div className="account-page d-flex flex-column min-vh-100">
      <HomeHeader showDesktopSearch />

      <main className="account-page__main flex-grow-1">
        <Container fluid="lg" className="account-page__container px-3 px-md-4 py-4">
          <div className="account-page__header">
            <h1 className="account-page__title">
              <i className="bi bi-person-badge" aria-hidden="true" />
              Minha conta GitHub
            </h1>
          </div>

          {isLoading ? <AccountPageSkeleton /> : null}

          {isUnauthenticated ? (
            <div className="account-page__state glass-card">
              <i className="bi bi-shield-lock account-page__state-icon" aria-hidden="true" />
              <h2>Conta não conectada</h2>
              <p>
                Configure <code>VITE_GITHUB_TOKEN</code> no arquivo <code>.env</code>{' '}
                para visualizar os dados da sua conta GitHub.
              </p>
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noreferrer"
                className="account-page__state-link"
              >
                Criar token no GitHub
              </a>
            </div>
          ) : null}

          {error ? (
            <p className="account-page__error">{error}</p>
          ) : null}

          {!isLoading && !isUnauthenticated && !error && user ? (
            <div className="account-page__grid">
              <AccountProfileCard user={user} />

              <div className="account-page__content">
                <AccountStatsGrid user={user} />
                <AccountOrganizations organizations={organizations} />
                <AccountRepositoriesSection
                  repositories={repositories}
                  isLoading={false}
                  isLoadingMore={isLoadingMore}
                  hasMore={hasMore}
                  onLoadMore={loadMore}
                />
              </div>
            </div>
          ) : null}
        </Container>
      </main>

      <HomeFooter />
    </div>
  )
}
