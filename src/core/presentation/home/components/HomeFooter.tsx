import Container from 'react-bootstrap/Container'
import './HomeFooter.css'

export function HomeFooter() {
  return (
    <footer className="home-footer">
      <Container fluid="lg" className="home-footer__container px-3 px-md-4">
        <div className="home-footer__brand">
          <span className="home-footer__logo">GitExplorer</span>
          <p className="home-footer__copyright">
            © 2026 GitExplorer Tech. Built for developers.
          </p>
        </div>
      </Container>
    </footer>
  )
}
