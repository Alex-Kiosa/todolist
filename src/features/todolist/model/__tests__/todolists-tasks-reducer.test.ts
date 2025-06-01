import {TasksStateType} from "../../../../app/App"
import {addTodolistAC, DomainTodolist, todolistsReducer} from "../todolists-reducer"
import {tasksReducer} from "../tasks-reducer"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<DomainTodolist> = []
  const newTodolist = {
    id: "any id",
    title: "new todolist",
    order: 0,
    addedDate: "",
  }

  const action = addTodolistAC(newTodolist)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(idFromTodolists)
  expect(idFromTasks).toEqual(action.payload.todolist.id)
})
