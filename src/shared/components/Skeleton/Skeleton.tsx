import type { CSSProperties } from 'react'
import './Skeleton.css'

type SkeletonVariant = 'text' | 'circular' | 'rectangular'

type SkeletonProps = {
  className?: string
  variant?: SkeletonVariant
  width?: CSSProperties['width']
  height?: CSSProperties['height']
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) {
  return (
    <span
      className={`skeleton skeleton--${variant} ${className ?? ''}`.trim()}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
