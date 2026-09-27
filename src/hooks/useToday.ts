import { useEffect, useState } from 'react'
import { addDays, startOfDay } from '@/utils/date'

/** Today at midnight. Updates when the day changes with the app open. */
export const useToday = () => {
  const [today, setToday] = useState(() => startOfDay(new Date()))

  useEffect(() => {
    const msUntilTomorrow = addDays(today, 1).getTime() - Date.now()
    const timeout = setTimeout(
      () => setToday(startOfDay(new Date())),
      msUntilTomorrow,
    )
    return () => clearTimeout(timeout)
  }, [today])

  return today
}
