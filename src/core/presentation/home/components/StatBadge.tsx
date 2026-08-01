type StatBadgeProps = {
  label: string
}

export function StatBadge({ label }: StatBadgeProps) {
  return <span className="stat-badge">{label}</span>
}
