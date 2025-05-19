import { v1 } from "uuid"
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from "../todolists-reducer"

let startState: Array<TodolistDomainType> = []
let todoListId1: string
let todoListId2: string

// 1. тестовые данные
beforeEach(() => {
  todoListId1 = v1()
  todoListId2 = v1()

  startState = [
    { id: todoListId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
    { id: todoListId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
  ]
})

test("correct todoList should be removed", () => {
  // 2. вызов тестируемой ф-ции
  const endState = todolistsReducer(startState, removeTodolistAC(todoListId1))

  // 3. сверка результата с ожиданием
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListId2)
})

test("correct todoList should be added", () => {
  const newTodoListTitle = "New TodoList"

  const endState = todolistsReducer(startState, addTodolistAC(newTodoListTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].filter).toBe("all")
  expect(endState[2].id).toBeDefined()
})

test("correct todoList title should be changed", () => {
  const newTodoListTitle = "New title"

  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todoListId1, title: newTodoListTitle }))

  expect(endState[0].title).toBe(newTodoListTitle)
  expect(endState[1].title).toBe("What to buy")
  expect(endState.length).toBe(2)
})

test("correct filter of todoList should be changed", () => {
  const newTodoListFilter = "active"

  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todoListId1, filter: newTodoListFilter }))

  expect(endState[0].filter).toBe(newTodoListFilter)
  expect(endState[1].filter).toBe("all")
})
