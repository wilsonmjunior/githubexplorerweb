const POPULAR_TAGS = ['reactjs', 'vercel', 'rust-lang'] as const

type PopularTagsProps = {
  onTagClick: (tag: string) => void
}

export function PopularTags({ onTagClick }: PopularTagsProps) {
  return (
    <div className="popular-tags d-none d-md-flex">
      <span className="popular-tags__label">POPULARES:</span>
      {POPULAR_TAGS.map((tag) => (
        <button
          key={tag}
          type="button"
          className="popular-tags__tag"
          onClick={() => onTagClick(tag)}
          aria-label={`Buscar usuários @${tag}`}
        >
          @{tag}
        </button>
      ))}
    </div>
  )
}
