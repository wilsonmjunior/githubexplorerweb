import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { NavbarGitHubButton } from '@/shared/components/NavbarGitHubButton'
import { APP_ROUTES } from '@/shared/constants/routes'
import './ProfilePageHeader.css'

export function ProfilePageHeader() {
  return (
    <header className="profile-header sticky-top">
      <Container fluid="lg" className="profile-header__container px-3 px-md-4">
        <div className="profile-header__top">
          <Link to={APP_ROUTES.HOME} className="profile-header__brand">
            <i className="bi bi-terminal" aria-hidden="true" />
            <span>GitExplorer</span>
          </Link>

          <div className="profile-header__actions">
            <NavbarGitHubButton />
          </div>
        </div>
      </Container>
    </header>
  )
}
