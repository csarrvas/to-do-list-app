import { useId } from 'react'
import { Search, X } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'
import { cn } from '@/utils/cn'

type TaskSearchProps = {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const TaskSearch = ({ value, onChange, className }: TaskSearchProps) => {
  const inputId = useId()

  return (
    <div role="search" className={cn('relative', className)}>
      <label htmlFor={inputId} className="sr-only">
        Buscar tareas
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Buscar por nombre o fecha"
        autoComplete="off"
        className="h-12 w-full appearance-none rounded-xl border border-line bg-surface pr-12 pl-11 text-ink placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <IconButton
          label="Limpiar búsqueda"
          onClick={() => onChange?.('')}
          className="absolute top-1/2 right-0.5 -translate-y-1/2"
        >
          <X />
        </IconButton>
      )}
    </div>
  )
}

export default TaskSearch
