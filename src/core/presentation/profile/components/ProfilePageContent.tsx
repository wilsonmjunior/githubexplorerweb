import Container from 'react-bootstrap/Container'
import { ProfileRepositoriesDesktop } from '@/core/presentation/profile/components/ProfileRepositoriesDesktop'
import { ProfileRepositoriesSection } from '@/core/presentation/profile/components/ProfileRepositoriesSection'
import { useGithubProfile } from '@/core/presentation/profile/hooks/useGithubProfile'
import { AppFooter } from '@/shared/components/AppFooter'
import { AppHeader } from '@/shared/components/AppHeader'
import { PageLayout } from '@/shared/components/PageLayout'
import { UserProfileCard } from '@/shared/components/UserProfileCard'
import {
  ProfilePageSkeleton,
  ProfileRepositoriesSkeleton,
} from '@/shared/components/skeletons/ProfilePageSkeleton'
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
    isLoadingRepos,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
  } = useGithubProfile()

  const isReposLoading =
    Boolean(user) && isLoadingRepos && repositories.length === 0

  return (
    <PageLayout
      className="profile-page"
      header={
        <>
          <AppHeader showBrandIcon mobileOnly />
          <div className="d-none d-md-block">
            <AppHeader showDesktopSearch />
          </div>
        </>
      }
      footer={<AppFooter />}
    >
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
              <UserProfileCard user={user} variant="hero" />
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
              isSearching={isLoadingRepos}
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
              <UserProfileCard user={user} variant="sidebar" />
              {isReposLoading ? (
                <ProfileRepositoriesSkeleton variant="desktop" />
              ) : (
                <ProfileRepositoriesDesktop
                  repositories={repositories}
                  totalCount={user.publicRepos}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  typeFilter={typeFilter}
                  onTypeFilterChange={setTypeFilter}
                  languageFilter={languageFilter}
                  onLanguageFilterChange={setLanguageFilter}
                  availableLanguages={availableLanguages}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  isSearching={isLoadingRepos}
                  isLoadingMore={isLoadingMore}
                  hasMore={hasMore}
                  onLoadMore={loadMore}
                />
              )}
            </div>
          </Container>
        </>
      ) : null}
    </PageLayout>
  )
}
