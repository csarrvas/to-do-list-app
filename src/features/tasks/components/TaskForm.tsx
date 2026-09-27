import { useId, useRef, useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import FieldError from '@/components/ui/FieldError'
import Input from '@/components/ui/Input'
import type { NewTask } from '@/features/tasks/types'
import { validateTask, type TaskErrors } from '@/features/tasks/validation'
import { cn } from '@/utils/cn'

type TaskFormProps = {
  /** Initial date, `YYYY-MM-DD` */
  defaultDueDate: string
  onAdd: (task: NewTask) => void
  className?: string
}

const TaskForm = ({ defaultDueDate, onAdd, className }: TaskFormProps) => {
  const [name, setName] = useState('')
  const [dueDate, setDueDate] = useState(defaultDueDate)
  const [errors, setErrors] = useState<TaskErrors>({})
  const nameRef = useRef<HTMLInputElement>(null)
  const dueDateRef = useRef<HTMLInputElement>(null)

  const headingId = useId()
  const nameId = useId()
  const nameLabelId = useId()
  const nameErrorId = useId()
  const dueDateId = useId()
  const dueDateErrorId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const task = { name: name.trim(), dueDate }
    const nextErrors = validateTask(task)
    setErrors(nextErrors)

    // Focus the first field to fix, or the name again to add the next task
    if (nextErrors.name) {
      nameRef.current?.focus()
    } else if (nextErrors.dueDate) {
      dueDateRef.current?.focus()
    } else {
      onAdd(task)
      setName('')
      nameRef.current?.focus()
    }
  }

  return (
    <form
      aria-labelledby={headingId}
      noValidate
      onSubmit={handleSubmit}
      className={cn(
        'rounded-2xl border border-line bg-surface p-4 lg:p-6',
        className,
      )}
    >
      {/* On mobile it looks like a label and the "Nombre" label is hidden,
          so the name field is labelled by both */}
      <h2
        id={headingId}
        className="text-sm font-bold lg:text-2xl lg:leading-tight"
      >
        Nueva tarea
      </h2>

      <div className="mt-1.5 flex flex-col gap-3 lg:mt-3 lg:gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            id={nameLabelId}
            htmlFor={nameId}
            className="sr-only text-sm font-bold lg:not-sr-only"
          >
            Nombre
          </label>
          <Input
            ref={nameRef}
            id={nameId}
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              setErrors((current) => ({ ...current, name: undefined }))
            }}
            placeholder="¿Qué necesitas hacer?"
            autoComplete="off"
            required
            aria-labelledby={`${headingId} ${nameLabelId}`}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? nameErrorId : undefined}
          />
          {errors.name && (
            <FieldError id={nameErrorId}>{errors.name}</FieldError>
          )}
        </div>

        {/* The button sits next to the date on mobile and below it on desktop */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1.5 lg:grid-cols-1">
          <label
            htmlFor={dueDateId}
            className="col-span-full text-sm font-bold"
          >
            Fecha
          </label>
          <Input
            ref={dueDateRef}
            id={dueDateId}
            name="dueDate"
            type="date"
            value={dueDate}
            onChange={(event) => {
              setDueDate(event.target.value)
              setErrors((current) => ({ ...current, dueDate: undefined }))
            }}
            required
            aria-invalid={errors.dueDate ? true : undefined}
            aria-describedby={errors.dueDate ? dueDateErrorId : undefined}
            className="[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-date-and-time-value]:text-left"
          />
          <Button type="submit" size="lg" className="lg:order-last lg:mt-2.5">
            <Plus />
            Agregar
          </Button>
          {errors.dueDate && (
            <FieldError id={dueDateErrorId} className="col-span-full mt-1.5">
              {errors.dueDate}
            </FieldError>
          )}
        </div>
      </div>
    </form>
  )
}

export default TaskForm
