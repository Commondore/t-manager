export interface ITask {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export interface TaskRequest {
  title: string
  userId: number
}

export interface TaskUpdate {
  taskId: number
  data: Partial<ITask>
}
