import type { RepositoryLanguageDto } from '@/core/domain/github'
import { LanguageDistributionBar } from '@/shared/components/LanguageDistributionBar'

type RepositoryMobileLanguagesProps = {
  languages: RepositoryLanguageDto[]
}

export function RepositoryMobileLanguages({
  languages,
}: RepositoryMobileLanguagesProps) {
  return (
    <LanguageDistributionBar
      languages={languages}
      variant="list"
      title="Linguagens"
    />
  )
}
