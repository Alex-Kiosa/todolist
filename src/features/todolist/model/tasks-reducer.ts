import {v1} from "uuid"
import {TasksStateType} from "../../../app/App"
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolists-reducer"
import {TaskPriorities, TaskStatuses} from "common/enums"
import {DomainTask} from "../api/tasksApi.types"
import {Dispatch} from "redux";
import {tasksApi} from "../api/taskApi";

type AddTaskAT = ReturnType<typeof createTaskAC>

type RemoveTaskAT = ReturnType<typeof removeTaskAC>

type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type SetTasksAT = {
    type: "SET-TASKS"
    payload: {
        tasks: Array<DomainTask>
        todolistId: string
    }
}

type ActionsType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект, который описывает какое-то событие в приложении)
// согласно прописанному type в этом action (инструкции) я поменяю model

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            const newTask: DomainTask = {
                todoListId: action.payload.todolistId,
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                description: "",
                addedDate: "",
                priority: TaskPriorities.Later,
                order: 0,
                deadline: "",
                startDate: "",
            }

            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = stateCopy[action.payload.todolistId].filter(
                (t) => t.id !== action.payload.taskId,
            )
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId]
            const task = tasks.find((t) => t.id === action.payload.taskId)
            if (task) {
                task.status = action.payload.status
            }
            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId]
            const task = tasks.find((t) => t.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
            return stateCopy
        }

        case "ADD-TODOLIST": {
            return {...state, [action.payload.id]: []}
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]

            return stateCopy
        }

        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })

            return copyState
        }

        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.payload.todolistId] = action.payload.tasks

            return copyState
        }

        default:
            return state
    }
}

// action creators - нужны для создания action объектов
// другими словами responsibility action creator - создание объекта action
export const createTaskAC = (payload: { todolistId: string; title: string }) => {
    return {
        type: "ADD-TASK",
        payload,
    } as const
}

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
    return {
        type: "REMOVE-TASK",
        payload,
    } as const
}

export const changeTaskStatusAC = (payload: {
    todolistId: string
    taskId: string
    status: TaskStatuses
}) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload,
    } as const
}

export const changeTaskTitleAC = (payload: {
    todolistId: string
    taskId: string
    title: string
}) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload,
    } as const
}

export const setTasksAC = (payload: {
    tasks: Array<DomainTask>
    todolistId: string
}): SetTasksAT => {
    return {
        type: "SET-TASKS",
        payload
    }
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.getTasks(todolistId)
            .then((res)=> {
                const tasks = res.data.items
                dispatch(setTasksAC({todolistId, tasks}))
            })
    }
}

export const removeTaskTC = (payload: {todolistId: string, taskId: string}) => {
    return (dispatch: Dispatch) => {
        tasksApi.removeTask(payload)
            .then((res)=> {
                dispatch(removeTaskAC(payload))
            })
    }
}

export const createTaskTC = (payload: {todolistId: string, title: string}) => {
    return (dispatch: Dispatch) => {
        tasksApi.createTask(payload)
            .then((res)=> {
                dispatch(createTaskAC(payload))
            })
    }
}