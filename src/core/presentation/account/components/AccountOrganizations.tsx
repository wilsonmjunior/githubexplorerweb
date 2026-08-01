import type { GitHubOrganizationDto } from '@/core/domain/github'
import './AccountOrganizations.css'

type AccountOrganizationsProps = {
  organizations: GitHubOrganizationDto[]
}

export function AccountOrganizations({ organizations }: AccountOrganizationsProps) {
  if (organizations.length === 0) {
    return null
  }

  return (
    <section className="account-organizations">
      <h2 className="account-organizations__title">
        <i className="bi bi-building" aria-hidden="true" />
        Organizações
      </h2>

      <div className="account-organizations__grid">
        {organizations.map((organization) => (
          <a
            key={organization.id}
            href={organization.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="account-organizations__item glass-card"
          >
            <img
              src={organization.avatarUrl}
              alt={`Logo de ${organization.login}`}
              className="account-organizations__avatar"
            />
            <div className="account-organizations__content">
              <span className="account-organizations__name">{organization.login}</span>
              {organization.description ? (
                <p className="account-organizations__description">
                  {organization.description}
                </p>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
