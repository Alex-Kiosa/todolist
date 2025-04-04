import { v1 } from "uuid"
import { FilterValues, TodolistProps } from "../../../app/App"

export type RemoveTodolistAT = {
  type: "REMOVE-TODOLIST" // тип преобразования
  payload: {
    id: string
  }
}

export type AddTodolistAT = {
  type: "ADD-TODOLIST"
  payload: {
    title: string
    id: string
  }
}

type ChangeTodolistTitleAT = {
  type: "CHANGE-TODOLIST-TITLE"
  payload: {
    id: string
    title: string
  }
}

type ChangeTodolistFilterAT = {
  type: "CHANGE-TODOLIST-FILTER"
  payload: {
    filter: FilterValues
    id: string
  }
}

type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект, который описывает какое-то событие в приложении)
// согласно прописанному type в этом action (инструкции) я поменяю model

export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState: Array<TodolistProps> = []

export const todolistsReducer = (
  state: Array<TodolistProps> = initialState,
  action: ActionsType,
): Array<TodolistProps> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }

    case "ADD-TODOLIST": {
      return [{ id: action.payload.id, title: action.payload.title, filter: "all" }, ...state]
    }

    case "CHANGE-TODOLIST-TITLE": {
      const newTodoLists = [...state]
      const todoList = newTodoLists.find((tl) => tl.id === action.payload.id)
      if (todoList) todoList.title = action.payload.title

      return newTodoLists
    }

    case "CHANGE-TODOLIST-FILTER": {
      const newTodoLists = [...state]
      const todoList = newTodoLists.find((tl) => tl.id === action.payload.id)
      if (todoList) {
        todoList.filter = action.payload.filter
      }

      return newTodoLists
    }

    default:
      return state
  }
}

// action creators - нужны для создания action объектов
// другими словами responsibility action creator - создание объекта action
// action creators - классический пример реализации паттерна фабричных ф-ций
export const removeTodolistAC = (id: string): RemoveTodolistAT => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const
}

export const addTodolistAC = (title: string): AddTodolistAT => {
  return { type: "ADD-TODOLIST", payload: { id: v1(), title } } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }): ChangeTodolistTitleAT => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }): ChangeTodolistFilterAT => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}
