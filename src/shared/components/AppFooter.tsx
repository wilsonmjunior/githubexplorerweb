import Container from 'react-bootstrap/Container'
import './AppFooter.css'

export function AppFooter() {
  return (
    <footer className="app-footer">
      <Container fluid="lg" className="app-footer__container px-3 px-md-4">
        <div className="app-footer__brand">
          <span className="app-footer__logo">GitExplorer</span>
          <p className="app-footer__copyright">
            © 2026 GitExplorer Tech. Feito para desenvolvedores.
          </p>
        </div>
      </Container>
    </footer>
  )
}
