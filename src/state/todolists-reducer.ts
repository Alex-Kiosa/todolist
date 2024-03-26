import { v1 } from "uuid";
import {FilterValuesType, TodolistType} from "../App";

// action - объект, который описывает какое-то событие в приложении
export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST" // тип преобразования
    id: string
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    id: string
}

type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string,
    newTodolistTitle: string
}

type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValuesType
    id: string
}

type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: Array<TodolistType> = [
    // {id: todoListId1, title: "What to learn", filter: "all"},
    // {id: todoListId2, title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [
                {id: action.id, title: action.title, filter: "all"},
                ...state
            ]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const newTodoLists = [...state]
            const todoList = newTodoLists.find(tl => tl.id === action.id)
            if (todoList) todoList.title = action.newTodolistTitle

            return newTodoLists
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const newTodoLists = [...state]
            const todoList = newTodoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.value
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
export const removeTodolistAC = (id: string): RemoveTodolistAT => ({
    type: "REMOVE-TODOLIST",
    id
})

export const addTodolistAC = (title: string): AddTodolistAT => ({
    type: "ADD-TODOLIST",
    id: v1(),
    title
})

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    newTodolistTitle: title
})

export const changeTodolistFilterAC = (id: string, value: FilterValuesType): ChangeTodolistFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    value,
    id
})