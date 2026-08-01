import Container from 'react-bootstrap/Container'
import { useState } from 'react'
import { HomeFooter } from '@/core/presentation/home/components/HomeFooter'
import { HomeHeader } from '@/core/presentation/home/components/HomeHeader'
import { HomeHero } from '@/core/presentation/home/components/HomeHero'
import { RepositorySearchResultsSection } from '@/core/presentation/home/components/RepositorySearchResultsSection'
import { SearchResultsSection } from '@/core/presentation/home/components/SearchResultsSection'
import { TrendingDevelopersSection } from '@/core/presentation/home/components/TrendingDevelopersSection'
import { useResponsiveHomeSearch } from '@/core/presentation/home/hooks/useResponsiveHomeSearch'
import { useTrendingDevelopers } from '@/core/presentation/home/hooks/useTrendingDevelopers'
import './HomePageContent.css'

export function HomePageContent() {
  const [isPopularTagSearch, setIsPopularTagSearch] = useState(false)
  const homeSearch = useResponsiveHomeSearch()
  const {
    mode,
    query,
    setQuery,
    results,
    totalCount,
    isSearching,
    error: searchError,
    hasActiveSearch,
  } = homeSearch

  const {
    developers,
    isLoading: isTrendingLoading,
    error: trendingError,
  } = useTrendingDevelopers()

  const handleTagClick = (tag: string) => {
    setIsPopularTagSearch(true)
    setQuery(tag)
  }

  const handleSearchChange = (value: string) => {
    setIsPopularTagSearch(false)
    setQuery(value)
  }

  return (
    <div className="home-page d-flex flex-column min-vh-100">
      <HomeHeader />

      <main className="home-page__main flex-grow-1">
        <Container fluid="lg" className="home-page__container px-3 px-md-4">
          <HomeHero
            searchQuery={query}
            onSearchChange={handleSearchChange}
            onTagClick={handleTagClick}
            isSearching={isSearching}
          />

          {hasActiveSearch ? (
            mode === 'users' ? (
              <SearchResultsSection
                results={results}
                totalCount={totalCount}
                isSearching={isSearching}
                error={searchError}
                useTrendingSkeleton={isPopularTagSearch}
              />
            ) : (
              <RepositorySearchResultsSection
                results={results}
                totalCount={totalCount}
                isSearching={isSearching}
                error={searchError}
              />
            )
          ) : (
            <TrendingDevelopersSection
              developers={developers}
              isLoading={isTrendingLoading}
              error={trendingError}
            />
          )}
        </Container>
      </main>

      <HomeFooter />
    </div>
  )
}
