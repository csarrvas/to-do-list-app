import {
  addDays,
  differenceInDays,
  formatDayMonth,
  formatLongDate,
  formatMonthShort,
  formatWeekday,
  isDateKey,
  parseDateKey,
  startOfDay,
  toDateKey,
} from '@/utils/date'

const saturday = new Date(2026, 8, 26)

it('converts dates to and from the date input format', () => {
  expect(toDateKey(saturday)).toBe('2026-09-26')
  expect(parseDateKey('2026-09-26')).toEqual(saturday)
})

it('recognizes valid dates in the date input format', () => {
  expect(isDateKey('2026-09-26')).toBe(true)
  expect(isDateKey('')).toBe(false)
  expect(isDateKey('26/09/2026')).toBe(false)
  expect(isDateKey('2026-02-30')).toBe(false)
})

it('drops the time of a date', () => {
  expect(startOfDay(new Date(2026, 8, 26, 18, 45))).toEqual(saturday)
})

it('counts calendar days between dates', () => {
  expect(differenceInDays(addDays(saturday, 4), saturday)).toBe(4)
  expect(differenceInDays(saturday, new Date(2026, 8, 28, 23, 59))).toBe(-2)
  expect(differenceInDays(new Date(2026, 9, 1), saturday)).toBe(5)
})

it('formats dates in Spanish', () => {
  expect(formatWeekday(saturday)).toBe('Sábado')
  expect(formatMonthShort(saturday)).toBe('sep')
  expect(formatDayMonth(saturday)).toBe('26 de septiembre')
  expect(formatLongDate(saturday)).toBe('Sábado 26 de septiembre')
})
