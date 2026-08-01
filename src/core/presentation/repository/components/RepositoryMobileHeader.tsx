import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { NavbarGitHubButton } from '@/shared/components/NavbarGitHubButton'
import { APP_ROUTES } from '@/shared/constants/routes'
import './RepositoryMobileHeader.css'

export function RepositoryMobileHeader() {
  return (
    <header className="repository-mobile-header sticky-top d-md-none">
      <Container fluid="lg" className="repository-mobile-header__container px-3">
        <Link to={APP_ROUTES.HOME} className="repository-mobile-header__brand">
          GitExplorer
        </Link>

        <div className="repository-mobile-header__actions">
          <NavbarGitHubButton />
        </div>
      </Container>
    </header>
  )
}
