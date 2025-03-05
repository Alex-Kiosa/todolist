import {v1} from "uuid";
import {TasksStateType} from "../app/App";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

type AddTaskAT = {
    type: "ADD-TASK"
    payload: {
        todoListId: string
        title: string
    }
}

type RemoveTaskAT = {
    type: "REMOVE-TASK"
    payload: {
        todoListId: string
        taskId: string
    }
}

type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    payload: {
        todoListId: string
        taskId: string
        isDone: boolean
    }
}

type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    payload: {
        todoListId: string
        taskId: string
        taskTitle: string
    }
}

type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект, который описывает какое-то событие в приложении)
// согласно прописанному type в этом action (инструкции) я поменяю state

const initialState:TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            // console.log(action.payload.todoListId)
            stateCopy[action.payload.todoListId] = [
                newTask,
                ...stateCopy[action.payload.todoListId]
            ]
            return stateCopy
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.payload.todoListId] = stateCopy[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todoListId]
            const task = tasks.find(t => t.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todoListId]
            const task = tasks.find(t => t.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.taskTitle
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
export const addTaskAC = (payload: {todoListId: string, title: string}): AddTaskAT => {
    return {
        type: "ADD-TASK",
        payload,
    } as const
}

export const removeTaskAC = (payload: {todoListId: string, taskId: string}): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK",
        payload,
    } as const
}

export const changeTaskStatusAC = (payload: {todoListId: string, taskId: string, isDone: boolean}): ChangeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload,
    } as const
}

export const changeTaskTitleAC = (payload: {todoListId: string, taskId: string, taskTitle: string}): ChangeTaskTitleAT => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload,
    } as const
}