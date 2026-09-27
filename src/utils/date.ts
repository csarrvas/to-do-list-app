const MS_PER_DAY = 24 * 60 * 60 * 1000

const weekdayFormat = new Intl.DateTimeFormat('es', { weekday: 'long' })
const monthFormat = new Intl.DateTimeFormat('es', { month: 'long' })

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

/** Formats a local date as `YYYY-MM-DD`, the value of `<input type="date">`. */
export const toDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Parses `YYYY-MM-DD` as a local date; `new Date(key)` would read it as UTC. */
export const parseDateKey = (key: string) => {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** Whether `value` is an existing date in `YYYY-MM-DD` format. */
export const isDateKey = (value: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) && toDateKey(parseDateKey(value)) === value

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)

/** Calendar days from `from` to `to`, ignoring the time and DST changes. */
export const differenceInDays = (to: Date, from: Date) => {
  const toDay = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())
  const fromDay = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
  return Math.round((toDay - fromDay) / MS_PER_DAY)
}

/** "Miércoles" */
export const formatWeekday = (date: Date) =>
  capitalize(weekdayFormat.format(date))

/**
 * "sep". Intl's short Spanish months vary between ICU versions ("sept",
 * "sep."), while the first three letters of the full name are always right.
 */
export const formatMonthShort = (date: Date) =>
  monthFormat.format(date).slice(0, 3)

/** "26 de septiembre" */
export const formatDayMonth = (date: Date) =>
  `${date.getDate()} de ${monthFormat.format(date)}`

/** "Sábado 26 de septiembre" */
export const formatLongDate = (date: Date) =>
  `${formatWeekday(date)} ${formatDayMonth(date)}`
