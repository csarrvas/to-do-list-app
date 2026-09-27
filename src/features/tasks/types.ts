export type Task = {
  id: string
  name: string
  /** `YYYY-MM-DD`, as returned by `<input type="date">` */
  dueDate: string
  completed: boolean
}

/** What the user fills in to create a task */
export type NewTask = Pick<Task, 'name' | 'dueDate'>
