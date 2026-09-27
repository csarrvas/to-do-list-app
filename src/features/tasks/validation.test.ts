import { validateTask } from '@/features/tasks/validation'

it('accepts a task with a name and a date', () => {
  expect(validateTask({ name: 'Comprar pan', dueDate: '2026-09-26' })).toEqual(
    {},
  )
})

it('requires a name besides spaces', () => {
  expect(validateTask({ name: '   ', dueDate: '2026-09-26' })).toEqual({
    name: 'Escribe un nombre para la tarea.',
  })
})

it('requires a valid date', () => {
  expect(validateTask({ name: 'Comprar pan', dueDate: '' })).toEqual({
    dueDate: 'Elige una fecha.',
  })
})
