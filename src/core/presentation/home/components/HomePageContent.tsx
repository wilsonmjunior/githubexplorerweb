import Container from 'react-bootstrap/Container'
import { useState } from 'react'
import { HomeHero } from '@/core/presentation/home/components/HomeHero'
import { SearchResultsSection } from '@/core/presentation/home/components/SearchResultsSection'
import { TrendingDevelopersSection } from '@/core/presentation/home/components/TrendingDevelopersSection'
import { useGithubSearch } from '@/core/presentation/home/hooks/useGithubSearch'
import { useTrendingDevelopers } from '@/core/presentation/home/hooks/useTrendingDevelopers'
import { AppFooter } from '@/shared/components/AppFooter'
import { AppHeader } from '@/shared/components/AppHeader'
import { PageLayout } from '@/shared/components/PageLayout'
import './HomePageContent.css'

export function HomePageContent() {
  const [isPopularTagSearch, setIsPopularTagSearch] = useState(false)
  const homeSearch = useGithubSearch()
  const {
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
    <PageLayout
      className="home-page"
      header={<AppHeader />}
      footer={<AppFooter />}
    >
      <Container fluid="lg" className="home-page__container px-3 px-md-4">
        <HomeHero
          searchQuery={query}
          onSearchChange={handleSearchChange}
          onTagClick={handleTagClick}
          isSearching={isSearching}
        />

        {hasActiveSearch ? (
          <SearchResultsSection
            results={results}
            totalCount={totalCount}
            isSearching={isSearching}
            error={searchError}
            useTrendingSkeleton={isPopularTagSearch}
          />
        ) : (
          <TrendingDevelopersSection
            developers={developers}
            isLoading={isTrendingLoading}
            error={trendingError}
          />
        )}
      </Container>
    </PageLayout>
  )
}
