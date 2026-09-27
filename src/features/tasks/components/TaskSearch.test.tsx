import { render, screen } from '@testing-library/react'
import TaskSearch from '@/features/tasks/components/TaskSearch'

it('renders an empty search field', () => {
  render(<TaskSearch />)
  expect(screen.getByRole('search')).toBeInTheDocument()
  expect(
    screen.getByRole('searchbox', { name: 'Buscar tareas' }),
  ).toHaveAttribute('placeholder', 'Buscar por nombre o fecha')
  expect(
    screen.queryByRole('button', { name: 'Limpiar búsqueda' }),
  ).not.toBeInTheDocument()
})

it('shows a clear button when there is a query', () => {
  render(<TaskSearch value="gimnasio" />)
  expect(screen.getByRole('searchbox')).toHaveValue('gimnasio')
  expect(
    screen.getByRole('button', { name: 'Limpiar búsqueda' }),
  ).toBeInTheDocument()
})
