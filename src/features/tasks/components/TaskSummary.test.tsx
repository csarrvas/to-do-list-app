import { render, screen } from '@testing-library/react'
import TaskSummary from '@/features/tasks/components/TaskSummary'

it('shows the pending tasks out of the total', () => {
  render(<TaskSummary total={5} pending={3} />)
  expect(screen.getByRole('status')).toHaveTextContent('3 de 5 pendientes')
})

it('uses the singular for a single pending task', () => {
  render(<TaskSummary total={5} pending={1} />)
  expect(screen.getByRole('status')).toHaveTextContent('1 de 5 pendiente')
})

it('says when there are no tasks', () => {
  render(<TaskSummary total={0} pending={0} />)
  expect(screen.getByRole('status')).toHaveTextContent('Sin tareas por ahora')
})
