export type Task = {
  id: string
  name: string
  /** `YYYY-MM-DD`, as returned by `<input type="date">` */
  dueDate: string
  completed: boolean
}
