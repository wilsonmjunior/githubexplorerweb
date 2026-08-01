import type { AuthenticatedGitHubUserDto } from '@/core/domain/github'
import { StatsGrid } from '@/shared/components/StatsGrid'
import { formatCompactNumber } from '@/shared/utils/format-number'

type AccountStatsGridProps = {
  user: AuthenticatedGitHubUserDto
}

export function AccountStatsGrid({ user }: AccountStatsGridProps) {
  const stats = [
    {
      label: 'Repositórios públicos',
      value: formatCompactNumber(user.publicRepos),
      icon: 'bi-folder',
    },
    {
      label: 'Repositórios privados',
      value: formatCompactNumber(user.totalPrivateRepos),
      icon: 'bi-lock',
    },
    {
      label: 'Gists públicos',
      value: formatCompactNumber(user.publicGists),
      icon: 'bi-file-code',
    },
    {
      label: 'Colaboradores',
      value: formatCompactNumber(user.collaborators),
      icon: 'bi-people',
    },
  ]

  return (
    <StatsGrid
      items={stats}
      variant="glass"
      columns={4}
      ariaLabel="Estatísticas da conta"
    />
  )
}
