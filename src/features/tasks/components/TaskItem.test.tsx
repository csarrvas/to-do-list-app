import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import TaskItem from '@/features/tasks/components/TaskItem'
import type { Task } from '@/features/tasks/types'
import { createTask } from '@/test/factories'

const today = new Date(2026, 8, 26)

const renderItem = (task: Task) => {
  const user = userEvent.setup()
  const onToggle = vi.fn()
  const onDelete = vi.fn()
  const item = (task: Task) => (
    <ul>
      <TaskItem
        task={task}
        today={today}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </ul>
  )
  const { rerender } = render(item(task))
  return {
    user,
    onToggle,
    onDelete,
    rerender: (task: Task) => rerender(item(task)),
  }
}

it('renders a pending task with its due status', () => {
  renderItem(createTask({ name: 'Comprar pan y café', dueDate: '2026-09-26' }))

  const checkbox = screen.getByRole('checkbox', { name: 'Comprar pan y café' })
  expect(checkbox).not.toBeChecked()
  expect(checkbox).toHaveAccessibleDescription('Hoy, 26 de septiembre')
})

it('renders a completed task', () => {
  renderItem(
    createTask({
      name: 'Pagar el internet',
      dueDate: '2026-09-25',
      completed: true,
    }),
  )

  const checkbox = screen.getByRole('checkbox', { name: 'Pagar el internet' })
  expect(checkbox).toBeChecked()
  expect(checkbox).toHaveAccessibleDescription('Completada, 25 de septiembre')
  expect(screen.getByText('Pagar el internet')).toHaveClass('line-through')
})

it('asks to toggle the task from its checkbox', async () => {
  const task = createTask({ name: 'Comprar pan' })
  const { user, onToggle } = renderItem(task)

  await user.click(screen.getByRole('checkbox', { name: 'Comprar pan' }))

  expect(onToggle).toHaveBeenCalledWith(task.id)
})

it('gives the focus back to the checkbox once the task is toggled', async () => {
  const task = createTask({ name: 'Comprar pan' })
  const { user, rerender } = renderItem(task)
  const checkbox = screen.getByRole('checkbox', { name: 'Comprar pan' })

  await user.click(checkbox)
  // Browsers blur the checkbox when the toggled task moves in the list
  checkbox.blur()
  rerender({ ...task, completed: true })

  expect(checkbox).toHaveFocus()
})

it('does not take the focus if the checkbox did not have it', () => {
  const task = createTask({ name: 'Comprar pan' })
  const { rerender } = renderItem(task)
  const checkbox = screen.getByRole('checkbox', { name: 'Comprar pan' })

  fireEvent.click(checkbox)
  rerender({ ...task, completed: true })

  expect(checkbox).not.toHaveFocus()
})

it('asks to delete the task', async () => {
  const task = createTask({ name: 'Comprar pan' })
  const { user, onDelete } = renderItem(task)

  await user.click(
    screen.getByRole('button', { name: 'Eliminar «Comprar pan»' }),
  )

  expect(onDelete).toHaveBeenCalledWith(task.id)
})
