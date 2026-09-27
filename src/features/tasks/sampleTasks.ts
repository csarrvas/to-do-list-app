import type { Task } from '@/features/tasks/types'
import { addDays, toDateKey } from '@/utils/date'

/**
 * The tasks from the design, dated relative to `today` so they always show
 * the same states. Placeholder until tasks can be created.
 */
export const getSampleTasks = (today: Date): Task[] => {
  const dueIn = (days: number) => toDateKey(addDays(today, days))

  return [
    {
      id: '1',
      name: 'Comprar pan y café',
      dueDate: dueIn(0),
      completed: false,
    },
    {
      id: '2',
      name: 'Enviar la prueba técnica',
      dueDate: dueIn(4),
      completed: false,
    },
    {
      id: '3',
      name: 'Renovar la licencia',
      dueDate: dueIn(-2),
      completed: false,
    },
    { id: '4', name: 'Pagar el internet', dueDate: dueIn(-1), completed: true },
    { id: '5', name: 'Configurar ESLint', dueDate: dueIn(-3), completed: true },
  ]
}
