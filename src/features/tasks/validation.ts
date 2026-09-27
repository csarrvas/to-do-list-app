import type { NewTask } from '@/features/tasks/types'
import { isDateKey } from '@/utils/date'

export type TaskErrors = Partial<Record<keyof NewTask, string>>

/** Returns an error message per invalid field; empty when the task is valid */
export const validateTask = ({ name, dueDate }: NewTask) => {
  const errors: TaskErrors = {}
  if (!name.trim()) errors.name = 'Escribe un nombre para la tarea.'
  if (!isDateKey(dueDate)) errors.dueDate = 'Elige una fecha.'
  return errors
}
