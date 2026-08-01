import type { ReactNode } from 'react'
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
  return (
    <div className={`page-layout d-flex flex-column min-vh-100 ${className}`.trim()}>
      {header}
      <main className="page-layout__main flex-grow-1">{children}</main>
      {footer}
    </div>
  )
}
