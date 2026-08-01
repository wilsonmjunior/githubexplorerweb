import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { HeaderRepositorySearch } from '@/core/presentation/home/components/HeaderRepositorySearch'
import { NavbarGitHubButton } from '@/shared/components/NavbarGitHubButton'
import { APP_ROUTES } from '@/shared/constants/routes'
import './HomeHeader.css'

type HomeHeaderProps = {
  showDesktopSearch?: boolean
}

export function HomeHeader({ showDesktopSearch = false }: HomeHeaderProps) {
  return (
    <header className="home-header sticky-top">
      <Navbar className="home-header__navbar py-3">
        <Container fluid="lg" className="home-header__container px-3 px-md-4">
          <div className="home-header__start">
            <Navbar.Brand as={Link} to={APP_ROUTES.HOME} className="home-header__brand p-0">
              GitExplorer
            </Navbar.Brand>
          </div>

          <div className="home-header__actions">
            {showDesktopSearch ? (
              <HeaderRepositorySearch className="d-none d-sm-flex" />
            ) : null}
            <NavbarGitHubButton />
          </div>
        </Container>
      </Navbar>
    </header>
  )
}
