import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import TaskList from '@/features/tasks/components/TaskList'
import { createTask } from '@/test/factories'

it('renders one item per task and passes on their actions', async () => {
  const user = userEvent.setup()
  const onToggle = vi.fn()
  const onDelete = vi.fn()
  const bread = createTask({ name: 'Comprar pan' })
  const internet = createTask({ name: 'Pagar el internet' })
  render(
    <TaskList
      tasks={[bread, internet]}
      today={new Date(2026, 8, 26)}
      onToggle={onToggle}
      onDelete={onDelete}
    />,
  )

  expect(screen.getAllByRole('listitem')).toHaveLength(2)

  await user.click(screen.getByRole('checkbox', { name: 'Pagar el internet' }))
  expect(onToggle).toHaveBeenCalledWith(internet.id)

  await user.click(
    screen.getByRole('button', { name: 'Eliminar «Comprar pan»' }),
  )
  expect(onDelete).toHaveBeenCalledWith(bread.id)
})
