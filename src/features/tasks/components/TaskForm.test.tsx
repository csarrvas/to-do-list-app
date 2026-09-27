import { render, screen } from '@testing-library/react'
import TaskForm from '@/features/tasks/components/TaskForm'

it('renders the name and date fields with the add button', () => {
  render(<TaskForm defaultDueDate="2026-09-26" />)
  expect(screen.getByRole('form', { name: 'Nueva tarea' })).toBeInTheDocument()
  expect(
    screen.getByRole('textbox', { name: 'Nueva tarea Nombre' }),
  ).toBeInTheDocument()
  expect(screen.getByLabelText('Fecha')).toHaveValue('2026-09-26')
  expect(screen.getByRole('button', { name: 'Agregar' })).toBeInTheDocument()
})

it('shows the validation errors on their fields', () => {
  render(
    <TaskForm
      errors={{
        name: 'Escribe un nombre para la tarea.',
        dueDate: 'Elige una fecha.',
      }}
    />,
  )
  const name = screen.getByLabelText('Nombre')
  expect(name).toBeInvalid()
  expect(name).toHaveAccessibleDescription('Escribe un nombre para la tarea.')
  const dueDate = screen.getByLabelText('Fecha')
  expect(dueDate).toBeInvalid()
  expect(dueDate).toHaveAccessibleDescription('Elige una fecha.')
})
