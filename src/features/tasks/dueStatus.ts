import type { Task } from '@/features/tasks/types'
import { differenceInDays, formatWeekday, parseDateKey } from '@/utils/date'

export type DueTone = 'today' | 'upcoming' | 'overdue' | 'done'

export type DueStatus = {
  label: string
  tone: DueTone
}

/** Describes when a task is due relative to `today`, e.g. "Hoy" or "Miércoles". */
export const getDueStatus = (task: Task, today: Date): DueStatus => {
  if (task.completed) return { label: 'Completada', tone: 'done' }

  const dueDate = parseDateKey(task.dueDate)
  const days = differenceInDays(dueDate, today)

  if (days < -1) return { label: `Venció hace ${-days} días`, tone: 'overdue' }
  if (days === -1) return { label: 'Venció ayer', tone: 'overdue' }
  if (days === 0) return { label: 'Hoy', tone: 'today' }
  if (days === 1) return { label: 'Mañana', tone: 'upcoming' }
  if (days < 7) return { label: formatWeekday(dueDate), tone: 'upcoming' }
  return { label: `En ${days} días`, tone: 'upcoming' }
}
