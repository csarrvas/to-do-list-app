import { render, screen } from '@testing-library/react'
import EmptyTasks from '@/features/tasks/components/EmptyTasks'

it('invites to create the first task', () => {
  render(<EmptyTasks />)
  expect(
    screen.getByRole('heading', { name: 'Aún no tienes tareas' }),
  ).toBeInTheDocument()
})
