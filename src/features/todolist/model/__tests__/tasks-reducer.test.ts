import {createTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../tasks-reducer"
import {TasksStateType} from "../../../../app/App"
import {addTodolistAC, deleteTodolistAC} from "../todolists-reducer"
import {TaskPriorities, TaskStatuses} from "common/enums"

let startState: TasksStateType = {}

// 1. тестовые данные
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "ReactJS",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Chicken",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "Fruits",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
  }
})

test("task should be added in correct todolist", () => {
  const newTask = {
    description: "",
    title: "Oil",
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
    id: "any id",
    todoListId: "todolistId2",
    order: 0,
    addedDate: ""
  }
  const endState = tasksReducer(startState, createTaskAC({task: newTask}))

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(3)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("Oil")
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

test("task should be removed in correct todolist", () => {
  const endState = tasksReducer(startState, removeTaskAC({ todolistId: "todolistId1", taskId: "2" }))

  expect(endState["todolistId1"].length).toBe(2)
  expect(endState["todolistId2"].length).toBe(2)
  expect(endState["todolistId1"].every((t) => t.id !== "2")).toBe(true)
})

test("status of specific task should be changed", () => {
  const endState = tasksReducer(
    startState,
      updateTaskAC({ todolistId: "todolistId1", taskId: "2", domainModel: {status: TaskStatuses.New} }),
  )

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.New)
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed)
})

test("title of specific task should be changed", () => {
  const endState = tasksReducer(startState, updateTaskAC({ todolistId: "todolistId1", taskId: "2", domainModel: {title: "new title",}}))

  expect(endState["todolistId1"][1].title).toBe("new title")
  expect(endState["todolistId2"][1].title).toBe("Fruits")
})

test("new array should be added when new todolist is added", () => {
  const newTodolist = {
    id: "any id",
    title: "new todolist",
    order: 0,
    addedDate: "",
  }
  const endState = tasksReducer(startState, addTodolistAC(newTodolist))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, deleteTodolistAC("todolistId2"))

  const keys = Object.keys(endState)
  expect(keys.length).toBe(1)
  expect(keys[0]).toBe("todolistId1")
})
