type ClassValue = string | false | null | undefined

/** Joins class names and skips falsy values, for conditional classes. */
export const cn = (...classes: ClassValue[]) =>
  classes.filter(Boolean).join(' ')
