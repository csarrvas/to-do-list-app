import { render, screen } from '@testing-library/react'
import TasksPage from '@/pages/TasksPage'

it('renders the header, the form, the search and the sample tasks', () => {
  render(<TasksPage />)
  expect(
    screen.getByRole('heading', { level: 1, name: 'Tareas' }),
  ).toBeInTheDocument()
  expect(screen.getByRole('form', { name: 'Nueva tarea' })).toBeInTheDocument()
  expect(screen.getByRole('search')).toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent('3 de 5 pendientes')
  expect(screen.getAllByRole('listitem')).toHaveLength(5)
})
