import CalendarSheet from '@/features/tasks/components/CalendarSheet'

const EmptyTasks = () => {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-10 text-center">
      <CalendarSheet size="lg" />
      <h3 className="mt-3 font-display text-title font-bold">
        Aún no tienes tareas
      </h3>
      <p className="mt-3 max-w-xs text-body text-muted">
        Escribe la primera en el formulario y elige para cuándo es.
      </p>
    </div>
  )
}

export default EmptyTasks
