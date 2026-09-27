import { render, screen } from '@testing-library/react'
import TaskItem from '@/features/tasks/components/TaskItem'
import type { Task } from '@/features/tasks/types'

const today = new Date(2026, 8, 26)

const renderItem = (task: Task) =>
  render(
    <ul>
      <TaskItem task={task} today={today} />
    </ul>,
  )

it('renders a pending task with its due status', () => {
  renderItem({
    id: '1',
    name: 'Comprar pan y café',
    dueDate: '2026-09-26',
    completed: false,
  })
  const checkbox = screen.getByRole('checkbox', { name: 'Comprar pan y café' })
  expect(checkbox).not.toBeChecked()
  expect(checkbox).toHaveAccessibleDescription('Hoy, 26 de septiembre')
  expect(
    screen.getByRole('button', { name: 'Eliminar «Comprar pan y café»' }),
  ).toBeInTheDocument()
})

it('renders a completed task', () => {
  renderItem({
    id: '2',
    name: 'Pagar el internet',
    dueDate: '2026-09-25',
    completed: true,
  })
  const checkbox = screen.getByRole('checkbox', { name: 'Pagar el internet' })
  expect(checkbox).toBeChecked()
  expect(checkbox).toHaveAccessibleDescription('Completada, 25 de septiembre')
})
