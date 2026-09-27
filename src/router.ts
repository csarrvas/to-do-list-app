import { createBrowserRouter, type RouteObject } from 'react-router'
import App from '@/App'
import ErrorPage from '@/pages/ErrorPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    ErrorBoundary: ErrorPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]

export const router = createBrowserRouter(routes)
