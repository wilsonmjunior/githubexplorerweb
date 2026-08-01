import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { HeaderRepositorySearch } from '@/shared/components/HeaderRepositorySearch'
import { NavbarGitHubButton } from '@/shared/components/NavbarGitHubButton'
import { APP_ROUTES } from '@/shared/constants/routes'
import './AppHeader.css'

type AppHeaderProps = {
  showDesktopSearch?: boolean
  showBrandIcon?: boolean
  mobileOnly?: boolean
}

export function AppHeader({
  showDesktopSearch = false,
  showBrandIcon = false,
  mobileOnly = false,
}: AppHeaderProps) {
  const headerClassName = [
    'app-header sticky-top',
    mobileOnly ? 'd-md-none' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClassName}>
      <Navbar className="app-header__navbar py-3">
        <Container fluid="lg" className="app-header__container px-3 px-md-4">
          <div className="app-header__start">
            <Navbar.Brand
              as={Link}
              to={APP_ROUTES.HOME}
              className="app-header__brand p-0"
            >
              {showBrandIcon ? (
                <i className="bi bi-terminal" aria-hidden="true" />
              ) : null}
              <span>GitExplorer</span>
            </Navbar.Brand>
          </div>

          <div className="app-header__actions">
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
