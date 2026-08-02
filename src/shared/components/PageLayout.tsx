import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import './PageLayout.css'

type PageLayoutProps = {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  className?: string
}

export function PageLayout({
  children,
  header,
  footer,
  className = '',
}: PageLayoutProps) {
  const mainRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className={`page-layout d-flex flex-column min-vh-100 ${className}`.trim()}>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      {header}
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="page-layout__main flex-grow-1"
      >
        {children}
      </main>
      {footer}
    </div>
  )
}
