export const APP_ROUTES = {
  HOME: '/',
  TRENDING_DEVELOPERS: '/developers/trending',
  PROFILE: '/users/:login',
  REPOSITORY: '/repos/:owner/:repo',
} as const

export function profilePath(login: string) {
  return `/users/${login}`
}

export function repositoryPath(owner: string, repo: string) {
  return `/repos/${owner}/${repo}`
}
