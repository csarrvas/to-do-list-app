import Button from '@/components/ui/Button'

type NoResultsProps = {
  query: string
  onClear?: () => void
}

const NoResults = ({ query, onClear }: NoResultsProps) => {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <h3 className="text-body-lg leading-6 font-bold">
        Ninguna tarea coincide con «{query}»
      </h3>
      <p className="mt-2.5 text-body text-muted">
        Busca por nombre o por fecha, por ejemplo 30/09 o miércoles.
      </p>
      <Button variant="secondary" onClick={onClear} className="mt-2.5">
        Limpiar búsqueda
      </Button>
    </div>
  )
}

export default NoResults
