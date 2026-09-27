import { getDueStatus } from '@/features/tasks/dueStatus'
import type { Task } from '@/features/tasks/types'

const today = new Date(2026, 8, 26)

const createTask = (dueDate: string, completed = false): Task => ({
  id: '1',
  name: 'Renovar la licencia',
  dueDate,
  completed,
})

it.each([
  ['2026-09-26', 'Hoy', 'today'],
  ['2026-09-27', 'Mañana', 'upcoming'],
  ['2026-09-30', 'Miércoles', 'upcoming'],
  ['2026-10-10', 'En 14 días', 'upcoming'],
  ['2026-09-25', 'Venció ayer', 'overdue'],
  ['2026-09-24', 'Venció hace 2 días', 'overdue'],
])('describes a task due on %s as "%s"', (dueDate, label, tone) => {
  expect(getDueStatus(createTask(dueDate), today)).toEqual({ label, tone })
})

it('describes completed tasks regardless of their date', () => {
  expect(getDueStatus(createTask('2026-09-24', true), today)).toEqual({
    label: 'Completada',
    tone: 'done',
  })
})
