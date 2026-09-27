import { useId, useLayoutEffect, useRef } from 'react'
import { Trash2 } from 'lucide-react'
import Checkbox from '@/components/ui/Checkbox'
import IconButton from '@/components/ui/IconButton'
import CalendarSheet from '@/features/tasks/components/CalendarSheet'
import { getDueStatus, type DueTone } from '@/features/tasks/dueStatus'
import type { Task } from '@/features/tasks/types'
import { cn } from '@/utils/cn'
import { formatDayMonth, parseDateKey } from '@/utils/date'

const toneClassNames: Record<DueTone, string> = {
  today: 'font-bold text-accent',
  upcoming: 'text-muted',
  overdue: 'font-bold text-danger',
  done: 'text-done',
}

type TaskItemProps = {
  task: Task
  today: Date
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const TaskItem = ({ task, today, onToggle, onDelete }: TaskItemProps) => {
  const nameId = useId()
  const statusId = useId()
  const checkboxRef = useRef<HTMLInputElement>(null)
  const refocusCheckbox = useRef(false)
  const dueDate = parseDateKey(task.dueDate)
  const status = getDueStatus(task, today)

  // Toggling can move the task to another place in the list, and moving the
  // element blurs it. Give the focus back before the browser paints.
  useLayoutEffect(() => {
    if (!refocusCheckbox.current) return
    refocusCheckbox.current = false
    checkboxRef.current?.focus({ preventScroll: true })
  }, [task.completed])

  return (
    <li className="flex items-center gap-2 py-2 pr-1 lg:gap-3.5 lg:py-3">
      <Checkbox
        ref={checkboxRef}
        checked={task.completed}
        onChange={(event) => {
          refocusCheckbox.current =
            document.activeElement === event.currentTarget
          onToggle(task.id)
        }}
        aria-labelledby={nameId}
        aria-describedby={statusId}
      />
      <CalendarSheet date={dueDate} muted={task.completed} />
      <div className="min-w-0 flex-1">
        <p
          id={nameId}
          className={cn(
            'wrap-break-word lg:text-body-lg',
            task.completed ? 'text-done line-through' : 'text-ink',
          )}
        >
          {task.name}
        </p>
        <p
          id={statusId}
          className={cn('text-caption', toneClassNames[status.tone])}
        >
          {status.label}
          {/* The sheet is decorative, so the full date is only for screen readers */}
          <span className="sr-only">
            , <time dateTime={task.dueDate}>{formatDayMonth(dueDate)}</time>
          </span>
        </p>
      </div>
      <IconButton
        label={`Eliminar «${task.name}»`}
        onClick={() => onDelete(task.id)}
      >
        <Trash2 />
      </IconButton>
    </li>
  )
}

export default TaskItem
