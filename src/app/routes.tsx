import { createBrowserRouter } from 'react-router-dom'
import { APP_ROUTES } from '@/shared/constants/routes'
import { TrendingDevelopersPage } from '@/app/developers/TrendingDevelopersPage'
import { HomePage } from '@/app/home/HomePage'
import { ProfilePage } from '@/app/profile/ProfilePage'
import { RepositoryDetailsPage } from '@/app/repository/RepositoryDetailsPage'

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: APP_ROUTES.TRENDING_DEVELOPERS,
    element: <TrendingDevelopersPage />,
  },
  {
    path: APP_ROUTES.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: APP_ROUTES.REPOSITORY,
    element: <RepositoryDetailsPage />,
  },
])
