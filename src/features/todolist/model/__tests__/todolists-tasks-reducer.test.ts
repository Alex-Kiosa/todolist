import {TasksStateType} from "../../../../app/App"
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "../todolists-reducer"
import {tasksReducer} from "../tasks-reducer"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolistAC("new todolist")

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(idFromTodolists)
  expect(idFromTasks).toEqual(action.payload.id)
})
