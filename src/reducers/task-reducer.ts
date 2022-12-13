// action - объект, который описывает какое-то событие в приложении
import {v1} from "uuid";
import {TaskStateType} from "../App";

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

type ActionsType = RemoveTaskAT | AddTaskAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK":
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const tasksCopy = [
                {id: "1", title: "Chiсken", isDone: true},

            ]
            stateCopy[action.todoListId] = [{id: "1", title: "Chiсken", isDone: true}]
            return stateCopy
        case "REMOVE-TASK":
            const newState = {...state}
            const newTasks = state[action.todoListId].filter(t => t.id !== action.taskId)
            newState["todolistId2"] = [
                {id: "1", title: "Chiсken", isDone: true},

            ]
            return newState

        default:
            throw new Error('I dont\'t understand this action type')
    }
}

// action creators - нужны для создания action объектов
// другими словами responsibility action creator - создание объекта action
export const addTaskAC = (title: string, todoListId: string): AddTaskAT => ({
    type: "ADD-TASK",
    title,
    todoListId
})

export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskAT => ({
    type: "REMOVE-TASK",
    todoListId,
    taskId,
})