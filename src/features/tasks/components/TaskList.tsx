import TaskItem from '@/features/tasks/components/TaskItem'
import type { Task } from '@/features/tasks/types'

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
