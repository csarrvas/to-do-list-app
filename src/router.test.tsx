import { screen } from '@testing-library/react'
import { createMemoryRouter, type RouteObject } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { vi } from 'vitest'
import ErrorPage from '@/pages/ErrorPage'
import { routes } from '@/router'
import { renderWithProviders } from '@/test/utils'

const renderRoute = (path: string, routeList: RouteObject[] = routes) => {
  const router = createMemoryRouter(routeList, { initialEntries: [path] })
  renderWithProviders(<RouterProvider router={router} />)
}

it('renders the tasks page on /', () => {
  renderRoute('/')
  expect(
    screen.getByRole('heading', { level: 1, name: 'Tareas' }),
  ).toBeInTheDocument()
})

it('renders the 404 page on an unknown path', () => {
  renderRoute('/does-not-exist')
  expect(
    screen.getByRole('heading', { name: '404 - Page not found' }),
  ).toBeInTheDocument()
})

it('renders the error page when a route throws', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  const Thrower = () => {
    throw new Error('Boom')
  }
  renderRoute('/', [
    { path: '/', Component: Thrower, ErrorBoundary: ErrorPage },
  ])
  expect(
    screen.getByRole('heading', { name: 'Something went wrong' }),
  ).toBeInTheDocument()
  expect(screen.getByText('Boom')).toBeInTheDocument()
})
