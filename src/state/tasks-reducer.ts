// action - объект, который описывает какое-то событие в приложении
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodolistAT, RemoveTodolistAT, todoListId1, todoListId2} from "./todolists-reducer";

type AddTaskAT = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}

type RemoveTaskAT = {
    type: "REMOVE-TASK"
    todoListId: string
    taskId: string
}

type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    todoListId: string
    taskId: string
    isDone: boolean
}

type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    todoListId: string
    taskId: string
    taskTitle: string
}

type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

const initialState:TasksStateType = {
    // [todoListId1]: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ],
    // [todoListId2]: [
    //     {id: v1(), title: "Chiсken", isDone: true},
    //     {id: v1(), title: "Fruits", isDone: true},
    //     {id: v1(), title: "Onion", isDone: false},
    // ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todoListId] = [
                newTask,
                ...stateCopy[action.todoListId]
            ]
            return stateCopy
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = stateCopy[action.todoListId].filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            debugger
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.taskTitle
            }
            return stateCopy
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.id] = []
            return stateCopy
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

// action creators - нужны для создания action объектов
// другими словами responsibility action creator - создание объекта action
export const addTaskAC = (todoListId: string, title: string): AddTaskAT => ({
    type: "ADD-TASK",
    todoListId,
    title
})

export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskAT => ({
    type: "REMOVE-TASK",
    todoListId,
    taskId,
})

export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean): ChangeTaskStatusAT => ({
    type: "CHANGE-TASK-STATUS",
    todoListId,
    taskId,
    isDone,
})

export const changeTaskTitleAC = (todoListId: string, taskId: string, taskTitle: string): ChangeTaskTitleAT => ({
    type: "CHANGE-TASK-TITLE",
    todoListId,
    taskId,
    taskTitle,
})