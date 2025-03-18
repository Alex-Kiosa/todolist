import {v1} from "uuid";
import {TasksState} from "../app/App";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

type AddTaskAT = {
    type: "ADD-TASK"
    payload: {
        todolistId: string
        title: string
    }
}

type RemoveTaskAT = {
    type: "REMOVE-TASK"
    payload: {
        todolistId: string
        taskId: string
    }
}

type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}

type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}

type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект, который описывает какое-то событие в приложении)
// согласно прописанному type в этом action (инструкции) я поменяю model

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: ActionsType): TasksState => {
    switch (action.type) {
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            // console.log(action.payload.todoListId)
            stateCopy[action.payload.todolistId] = [
                newTask,
                ...stateCopy[action.payload.todolistId]
            ]
            return stateCopy
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = stateCopy[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId]
            const task = tasks.find(t => t.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId]
            const task = tasks.find(t => t.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
            return stateCopy
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.payload.id] = []
            return stateCopy
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }

        default:
            return state
    }
}

// action creators - нужны для создания action объектов
// другими словами responsibility action creator - создание объекта action
export const addTaskAC = (payload: {
    todolistId: string,
    title: string
}): AddTaskAT => {
    return {
        type: "ADD-TASK",
        payload,
    } as const
}

export const removeTaskAC = (payload: {
    todolistId: string,
    taskId: string
}): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK",
        payload,
    } as const
}

export const changeTaskStatusAC = (payload: {
    todolistId: string,
    taskId: string,
    isDone: boolean
}): ChangeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload,
    } as const
}

export const changeTaskTitleAC = (payload: {
    todolistId: string,
    taskId: string,
    title: string
}): ChangeTaskTitleAT => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload,
    } as const
}