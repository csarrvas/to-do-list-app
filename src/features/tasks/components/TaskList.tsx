import TaskItem from '@/features/tasks/components/TaskItem'
import type { Task } from '@/features/tasks/types'
import { autoAnimateRef } from '@/utils/autoAnimateRef'

type TaskListProps = {
  tasks: Task[]
  today: Date
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const TaskList = ({ tasks, today, onToggle, onDelete }: TaskListProps) => {
  return (
    // role="list" keeps the list semantics that Safari drops with `list-style: none`
    <ul
      // Animates tasks being added, deleted, filtered out or moved when completed
      ref={autoAnimateRef}
      role="list"
      className="divide-y divide-line rounded-2xl border border-line bg-surface p-1"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          today={today}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TaskList
