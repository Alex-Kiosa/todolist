import {v1} from "uuid"
import {TodolistType} from "../api/todolistsApi.types"
import {todolistsApi} from "../api/todolistsApi";
import {Dispatch} from "redux";
import {RootState} from "../../../app/store";

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>

export type AddTodolistAT = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT | SetTodolistsAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект, который описывает какое-то событие в приложении)
// согласно прописанному type в этом action (инструкции) я поменяю model

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (
    state: Array<TodolistDomainType> = initialState,
    action: ActionsType,
): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.id)
        }

        case "ADD-TODOLIST": {
            return [
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    filter: "all",
                    addedDate: "",
                    order: 0,
                },
                ...state,
            ]
        }

        case "CHANGE-TODOLIST-TITLE": {
            const newTodoLists = [...state]
            const todoList = newTodoLists.find((tl) => tl.id === action.payload.id)
            if (todoList) todoList.title = action.payload.title

            return newTodoLists
        }

        case "CHANGE-TODOLIST-FILTER": {
            const newTodoLists = [...state]
            const todoList = newTodoLists.find((tl) => tl.id === action.payload.id)
            if (todoList) {
                todoList.filter = action.payload.filter
            }

            return newTodoLists
        }

        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }

        default:
            return state
    }
}

// action creators - нужны для создания action объектов
// другими словами responsibility action creator - создание объекта action
// action creators - классический пример реализации паттерна фабричных ф-ций
export const removeTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", payload: {id}} as const
}

export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", payload: {id: v1(), title}} as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload} as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload} as const
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: "SET-TODOLISTS", todolists} as const
}

// thunk (санка) - функция, которая принимает dispatch, getState и
// предназначена для того, чтобы внутри нее делать побочные эффекты (запросы на сервер) и диспатчить action или
// другие thunk
export const fetchTodolistsThunk = (dispatch: Dispatch, getState: () => RootState) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistsApi.getTodolists()
        .then((res) => {
            // и диспатчить экшены (action) или другие санки (thunk)
            dispatch(setTodolistsAC(res.data))
        })
}