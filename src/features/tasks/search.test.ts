import { filterTasks } from '@/features/tasks/search'
import { createTask } from '@/test/factories'

const saturday = new Date(2026, 8, 26)
const bread = createTask({ name: 'Comprar pan y café', dueDate: '2026-09-26' })
const bank = createTask({ name: 'Llamar al banco', dueDate: '2026-09-27' })
const exam = createTask({
  name: 'Enviar la prueba técnica',
  dueDate: '2026-09-30',
})
const license = createTask({
  name: 'Renovar la licencia',
  dueDate: '2026-09-24',
})
const tasks = [bread, bank, exam, license]

const search = (query: string) => filterTasks(tasks, query, saturday)

it('returns every task for an empty query', () => {
  expect(search('')).toBe(tasks)
  expect(search('   ')).toBe(tasks)
})

it('finds tasks by name, ignoring case and accents', () => {
  expect(search('PAN')).toEqual([bread])
  expect(search('tecnica')).toEqual([exam])
})

it.each([
  ['30/09', exam],
  ['30/9', exam],
  ['30/09/2026', exam],
  ['2026-09-24', license],
  ['24 de septiembre', license],
  ['miércoles', exam],
  ['miercoles', exam],
  ['hoy', bread],
  ['mañana', bank],
])('finds tasks by date: "%s"', (query, task) => {
  expect(search(query)).toEqual([task])
})

it('matches dates from the start of their words only', () => {
  // "ba" is in two names, and inside "sábado", the day "Comprar pan" is due
  expect(search('ba')).toEqual([bank, exam])
  expect(search('sáb')).toEqual([bread])
})

it.each(['05/01', '5/1', '5/01', '05/1'])(
  'finds dates with or without leading zeros: "%s"',
  (query) => {
    const taxes = createTask({ name: 'Pagar impuestos', dueDate: '2027-01-05' })
    expect(filterTasks([...tasks, taxes], query, saturday)).toEqual([taxes])
  },
)

it('needs every word of the query to match', () => {
  expect(search('renovar sep')).toEqual([license])
  expect(search('renovar hoy')).toEqual([])
})
