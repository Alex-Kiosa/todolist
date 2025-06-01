import { Todolist } from "./todolistsApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types"

export const todolistsApi = {
  getTodolists() {
    //instance.get() will return promise
    return instance.get<Todolist[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
}
