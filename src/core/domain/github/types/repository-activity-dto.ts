export type RepositoryActivityType = 'commit' | 'merge' | 'issue'

export type RepositoryActivityDto = {
  id: string
  type: RepositoryActivityType
  title: string
  subtitle: string
  tag: string
  tagVariant: 'primary' | 'tertiary' | 'error'
  occurredAt: string
}
