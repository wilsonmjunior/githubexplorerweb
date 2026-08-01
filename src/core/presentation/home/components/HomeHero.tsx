import { SearchBar } from '@/core/presentation/home/components/SearchBar'
import { PopularTags } from '@/core/presentation/home/components/PopularTags'
import { StatBadge } from '@/core/presentation/home/components/StatBadge'
import './HomeHero.css'

type HomeHeroProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
  onTagClick: (tag: string) => void
  isSearching?: boolean
}

export function HomeHero({
  searchQuery,
  onSearchChange,
  onTagClick,
  isSearching = false,
}: HomeHeroProps) {
  return (
    <section className="home-hero text-center">
      <div className="home-hero__intro">
        <h1 className="home-hero__title">
          Conecte-se ao melhor código do mundo
        </h1>
        <p className="home-hero__subtitle d-none d-md-block">
          Descubra desenvolvedores, explore repositórios e mergulhe no que há de
          mais avançado em código aberto com o GitExplorer.
        </p>
      </div>

      <div className="home-hero__search">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          isLoading={isSearching}
        />
      </div>

      <div className="home-hero__stats d-flex d-md-none flex-wrap justify-content-center gap-2">
        <StatBadge label="10M+ REPOSITÓRIOS" />
        <StatBadge label="5M+ DEVS" />
      </div>

      <PopularTags onTagClick={onTagClick} />
    </section>
  )
}
