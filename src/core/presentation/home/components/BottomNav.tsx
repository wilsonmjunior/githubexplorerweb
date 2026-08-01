import './BottomNav.css'

type BottomNavTab = 'settings'

type BottomNavItem = {
  id: BottomNavTab
  label: string
  icon: string
}

const NAV_ITEMS: BottomNavItem[] = [
  { id: 'settings', label: 'Settings', icon: 'bi-gear' },
]

type BottomNavProps = {
  activeTab?: BottomNavTab
}

export function BottomNav({ activeTab = 'settings' }: BottomNavProps) {
  return (
    <nav className="bottom-nav d-md-none" aria-label="Navegação principal">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeTab

        return (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <i className={`bi ${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
