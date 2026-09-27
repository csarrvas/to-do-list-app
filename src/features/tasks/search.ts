import type { Task } from '@/features/tasks/types'
import {
  differenceInDays,
  formatDayMonth,
  formatWeekday,
  parseDateKey,
} from '@/utils/date'

const relativeDays: Record<number, string> = {
  [-1]: 'ayer',
  0: 'hoy',
  1: 'mañana',
}

/** Lowercase and without accents, so "miercoles" finds "miércoles" */
const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

/**
 * The words of the task's date the way people type them: 05/09/2026 (with or
 * without leading zeros), 2026-09-05, "5 de septiembre", "sábado" and "hoy",
 * "mañana" or "ayer".
 */
const getDateWords = (dueDate: string, today: Date) => {
  const date = parseDateKey(dueDate)
  const [year, month, day] = dueDate.split('-')
  const days = [day, String(Number(day))]
  const months = [month, String(Number(month))]

  return [
    dueDate,
    ...days.flatMap((d) => months.map((m) => `${d}/${m}/${year}`)),
    ...formatDayMonth(date).split(' '),
    formatWeekday(date),
    relativeDays[differenceInDays(date, today)] ?? '',
  ]
    .filter(Boolean)
    .map(normalize)
}

/**
 * Tasks where each word of the query is part of the name or the start of a
 * word of the date. Dates only match from the start because they aren't
 * always visible: "ba" shouldn't find a task because it falls on a "sábado".
 */
export const filterTasks = (tasks: Task[], query: string, today: Date) => {
  const words = normalize(query).split(/\s+/).filter(Boolean)
  if (words.length === 0) return tasks

  return tasks.filter((task) => {
    const name = normalize(task.name)
    const dateWords = getDateWords(task.dueDate, today)
    return words.every(
      (word) =>
        name.includes(word) ||
        dateWords.some((dateWord) => dateWord.startsWith(word)),
    )
  })
}
