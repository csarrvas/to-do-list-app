import { createBrowserRouter, type RouteObject } from 'react-router'
import ErrorPage from '@/pages/ErrorPage'
import NotFoundPage from '@/pages/NotFoundPage'
import TasksPage from '@/pages/TasksPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: TasksPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]

export const router = createBrowserRouter(routes)
