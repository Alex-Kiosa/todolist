import { BaseResponse } from "common/types"
import { instance } from "common/instance/instance"
import { TaskPriority, TaskStatus } from "common/enums"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: Array<DomainTask>
}

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export const tasksApi = {
  getTasks(id: string) {
    //instance.get() will return promise
    return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, { model })
  },
  deleteTasks(paypoad: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = paypoad
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
