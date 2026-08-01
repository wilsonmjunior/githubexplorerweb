import './FollowingTag.css'

type FollowingTagProps = {
  className?: string
}

export function FollowingTag({ className }: FollowingTagProps) {
  return (
    <span className={`following-tag ${className ?? ''}`.trim()}>
      Following
    </span>
  )
}
