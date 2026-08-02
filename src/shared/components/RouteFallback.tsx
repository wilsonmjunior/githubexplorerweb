import './RouteFallback.css'

export function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite" aria-busy="true">
      <div className="route-fallback__spinner" aria-hidden="true" />
      <span className="route-fallback__label">Carregando página...</span>
    </div>
  )
}
