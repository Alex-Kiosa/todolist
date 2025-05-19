import { TodolistType } from "./todolistsApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types"

export const todolistsApi = {
  getTodolists() {
    //instance.get() will return promise
    return instance.get<TodolistType[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodolistType }>>("todo-lists", { title })
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
}
