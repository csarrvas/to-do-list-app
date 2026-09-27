import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import TaskForm from '@/features/tasks/components/TaskForm'

const renderForm = () => {
  const user = userEvent.setup()
  const onAdd = vi.fn()
  render(<TaskForm defaultDueDate="2026-09-26" onAdd={onAdd} />)

  return {
    user,
    onAdd,
    name: screen.getByRole('textbox', { name: 'Nueva tarea Nombre' }),
    dueDate: screen.getByLabelText('Fecha'),
    submit: screen.getByRole('button', { name: 'Agregar' }),
  }
}

it('starts empty, with the given date', () => {
  const { name, dueDate } = renderForm()
  expect(screen.getByRole('form', { name: 'Nueva tarea' })).toBeInTheDocument()
  expect(name).toHaveValue('')
  expect(dueDate).toHaveValue('2026-09-26')
})

it('adds a task and gets ready for the next one', async () => {
  const { user, onAdd, name, dueDate, submit } = renderForm()

  await user.type(name, '  Enviar la prueba técnica  ')
  fireEvent.change(dueDate, { target: { value: '2026-09-30' } })
  await user.click(submit)

  expect(onAdd).toHaveBeenCalledWith({
    name: 'Enviar la prueba técnica',
    dueDate: '2026-09-30',
  })
  expect(name).toHaveValue('')
  expect(name).toHaveFocus()
  expect(dueDate).toHaveValue('2026-09-30')
})

it('adds the task when pressing Enter', async () => {
  const { user, onAdd, name } = renderForm()
  await user.type(name, 'Comprar pan{Enter}')
  expect(onAdd).toHaveBeenCalledWith({
    name: 'Comprar pan',
    dueDate: '2026-09-26',
  })
})

it('explains what is missing and focuses the first field to fix', async () => {
  const { user, onAdd, name, dueDate, submit } = renderForm()

  await user.type(name, '   ')
  fireEvent.change(dueDate, { target: { value: '' } })
  await user.click(submit)

  expect(onAdd).not.toHaveBeenCalled()
  expect(name).toHaveAttribute('aria-invalid', 'true')
  expect(name).toHaveAccessibleDescription('Escribe un nombre para la tarea.')
  expect(dueDate).toHaveAttribute('aria-invalid', 'true')
  expect(dueDate).toHaveAccessibleDescription('Elige una fecha.')
  expect(name).toHaveFocus()
})

it('focuses the date when only the date is missing', async () => {
  const { user, name, dueDate, submit } = renderForm()

  await user.type(name, 'Comprar pan')
  fireEvent.change(dueDate, { target: { value: '' } })
  await user.click(submit)

  expect(name).not.toHaveAttribute('aria-invalid')
  expect(dueDate).toHaveFocus()
})

it('hides the error of a field once it is edited', async () => {
  const { user, name, submit } = renderForm()

  await user.click(submit)
  expect(
    screen.getByText('Escribe un nombre para la tarea.'),
  ).toBeInTheDocument()

  await user.type(name, 'C')
  expect(
    screen.queryByText('Escribe un nombre para la tarea.'),
  ).not.toBeInTheDocument()
  expect(name).not.toHaveAttribute('aria-invalid')
})
