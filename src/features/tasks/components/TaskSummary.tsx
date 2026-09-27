import { cn } from '@/utils/cn'

type TaskSummaryProps = {
  total: number
  pending: number
  className?: string
}

const TaskSummary = ({ total, pending, className }: TaskSummaryProps) => {
  return (
    <p
      role="status"
      className={cn('text-body font-bold lg:text-base', className)}
    >
      {total === 0
        ? 'Sin tareas por ahora'
        : `${pending} de ${total} ${pending === 1 ? 'pendiente' : 'pendientes'}`}
    </p>
  )
}

export default TaskSummary
