import { createElement, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { SuspenseRoute } from '@/app/SuspenseRoute'
import { APP_ROUTES } from '@/shared/constants/routes'

const HomePage = lazy(() =>
  import('@/app/home/HomePage').then((module) => ({
    default: module.HomePage,
  })),
)
const TrendingDevelopersPage = lazy(() =>
  import('@/app/developers/TrendingDevelopersPage').then((module) => ({
    default: module.TrendingDevelopersPage,
  })),
)
const AccountPage = lazy(() =>
  import('@/app/account/AccountPage').then((module) => ({
    default: module.AccountPage,
  })),
)
const ProfilePage = lazy(() =>
  import('@/app/profile/ProfilePage').then((module) => ({
    default: module.ProfilePage,
  })),
)
const RepositoryDetailsPage = lazy(() =>
  import('@/app/repository/RepositoryDetailsPage').then((module) => ({
    default: module.RepositoryDetailsPage,
  })),
)

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: createElement(SuspenseRoute, { component: HomePage }),
  },
  {
    path: APP_ROUTES.TRENDING_DEVELOPERS,
    element: createElement(SuspenseRoute, { component: TrendingDevelopersPage }),
  },
  {
    path: APP_ROUTES.ACCOUNT,
    element: createElement(SuspenseRoute, { component: AccountPage }),
  },
  {
    path: APP_ROUTES.PROFILE,
    element: createElement(SuspenseRoute, { component: ProfilePage }),
  },
  {
    path: APP_ROUTES.REPOSITORY,
    element: createElement(SuspenseRoute, { component: RepositoryDetailsPage }),
  },
])
