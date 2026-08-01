/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-presentation-to-infra',
      severity: 'error',
      comment:
        'Presentation does not depend on infrastructure (SDKs, HTTP adapters). Use domain ports and composition.',
      from: { path: '^src/core/presentation' },
      to: { path: '^src/core/infra' },
    },
    {
      name: 'no-domain-to-infra',
      severity: 'error',
      comment: 'Domain does not depend on infrastructure.',
      from: { path: '^src/core/domain' },
      to: { path: '^src/core/infra' },
    },
    {
      name: 'no-domain-to-application',
      severity: 'error',
      comment: 'Domain does not depend on application.',
      from: { path: '^src/core/domain' },
      to: { path: '^src/core/application' },
    },
    {
      name: 'no-domain-to-presentation',
      severity: 'error',
      comment: 'Domain does not depend on presentation.',
      from: { path: '^src/core/domain' },
      to: { path: '^src/core/presentation' },
    },
    {
      name: 'no-application-to-infra',
      severity: 'error',
      comment: 'Application does not depend on infrastructure.',
      from: { path: '^src/core/application' },
      to: { path: '^src/core/infra' },
    },
    {
      name: 'no-application-to-presentation',
      severity: 'error',
      comment: 'Application does not depend on presentation.',
      from: { path: '^src/core/application' },
      to: { path: '^src/core/presentation' },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
      dependencyTypes: ['npm', 'npm-dev', 'npm-optional', 'npm-peer'],
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
  },
}
