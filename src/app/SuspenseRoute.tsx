import { Suspense, type ComponentType } from 'react'
import { RouteFallback } from '@/shared/components/RouteFallback'

type SuspenseRouteProps = {
  component: ComponentType
}

export function SuspenseRoute({ component: Component }: SuspenseRouteProps) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Component />
    </Suspense>
  )
}
