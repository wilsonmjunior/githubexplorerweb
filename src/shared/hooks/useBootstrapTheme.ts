import { useEffect } from 'react'

export function useBootstrapTheme() {
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
  }, [])
}
