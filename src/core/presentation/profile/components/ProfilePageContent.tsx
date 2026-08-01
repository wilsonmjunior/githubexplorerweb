import Container from 'react-bootstrap/Container'
import { BottomNav } from '@/core/presentation/home/components/BottomNav'
import { HomeFooter } from '@/core/presentation/home/components/HomeFooter'
import { HomeHeader } from '@/core/presentation/home/components/HomeHeader'
import { ProfileHero } from '@/core/presentation/profile/components/ProfileHero'
import { ProfilePageHeader } from '@/core/presentation/profile/components/ProfilePageHeader'
import { ProfileRepositoriesDesktop } from '@/core/presentation/profile/components/ProfileRepositoriesDesktop'
import { ProfileRepositoriesSection } from '@/core/presentation/profile/components/ProfileRepositoriesSection'
import { ProfileSidebar } from '@/core/presentation/profile/components/ProfileSidebar'
import { ProfilePageSkeleton, ProfileRepositoriesSkeleton } from '@/shared/components/skeletons/ProfilePageSkeleton'
import { useGithubProfile } from '@/core/presentation/profile/hooks/useGithubProfile'
import './ProfilePageContent.css'

export function ProfilePageContent() {
  const {
    user,
    repositories,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    languageFilter,
    setLanguageFilter,
    availableLanguages,
    sortBy,
    setSortBy,
    isLoading,
    isLoadingMore,
    isSearching,
    error,
    hasMore,
    loadMore,
  } = useGithubProfile()

  const isReposLoading = Boolean(user) && isSearching && repositories.length === 0

  return (
    <div className="profile-page d-flex flex-column min-vh-100">
      <div className="d-md-none">
        <ProfilePageHeader />
      </div>
      <div className="d-none d-md-block">
        <HomeHeader showDesktopSearch />
      </div>

      <main className="profile-page__main flex-grow-1">
        {isLoading ? <ProfilePageSkeleton /> : null}

        {error ? (
          <Container fluid="lg" className="px-3 px-md-4">
            <p className="profile-page__error">{error}</p>
          </Container>
        ) : null}

        {!isLoading && !error && user ? (
          <>
            <div className="d-md-none">
              <Container fluid="lg" className="profile-page__hero px-3">
                <ProfileHero user={user} />
              </Container>

              <ProfileRepositoriesSection
                repositories={repositories}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                typeFilter={typeFilter}
                onTypeFilterChange={setTypeFilter}
                languageFilter={languageFilter}
                onLanguageFilterChange={setLanguageFilter}
                availableLanguages={availableLanguages}
                sortBy={sortBy}
                onSortChange={setSortBy}
                isSearching={isSearching}
                isLoadingMore={isLoadingMore}
                hasMore={hasMore}
                onLoadMore={loadMore}
              />
            </div>

            <Container
              fluid="lg"
              className="profile-page__desktop d-none d-md-block px-4 py-4"
            >
              <div className="profile-page__grid">
                <ProfileSidebar user={user} />
                {isReposLoading ? (
                  <ProfileRepositoriesSkeleton variant="desktop" />
                ) : (
                  <ProfileRepositoriesDesktop
                    repositories={repositories}
                    totalCount={user.publicRepos}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    isSearching={isSearching}
                    isLoadingMore={isLoadingMore}
                    hasMore={hasMore}
                    onLoadMore={loadMore}
                  />
                )}
              </div>
            </Container>
          </>
        ) : null}
      </main>

      <HomeFooter />
      <BottomNav />
      <div className="bottom-nav-spacer d-md-none" aria-hidden="true" />
    </div>
  )
}
