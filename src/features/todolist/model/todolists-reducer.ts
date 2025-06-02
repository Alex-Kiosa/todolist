import {Todolist} from "../api/todolistsApi.types"
import {todolistsApi} from "../api/todolistsApi";
import {Dispatch} from "redux";

const initialState: Array<DomainTodolist> = []

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект, который описывает какое-то событие в приложении)
// согласно прописанному type в этом action (инструкции) я поменяю model

export const todolistsReducer = (
    state: Array<DomainTodolist> = initialState,
    action: ActionsType,
): Array<DomainTodolist> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.id)
        }

        case "ADD-TODOLIST": {
            return [
                {...action.payload.todolist, filter: "all"},
                ...state,
            ]
        }

        case "CHANGE-TODOLIST-TITLE": {
            return state.map((tl) => {
                return tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl
            })
        }

        case "CHANGE-TODOLIST-FILTER": {
            return state.map((tl) => {
                return tl.id === action.payload.id ? {...tl, title: action.payload.filter} : tl
            })
        }

        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {...tl, filter: "all"}
            })
        }

        default:
            return state
    }
}

// Actions types
export type RemoveTodolistAT = ReturnType<typeof deleteTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type FilterValuesType = "all" | "active" | "completed"
export type DomainTodolist = Todolist & {
    filter: FilterValuesType
}

type ActionsType =
    | RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistsAT

// action creators - нужны для создания action объектов
// другими словами responsibility action creator - создание объекта action
// action creators - классический пример реализации паттерна фабричных ф-ций
export const deleteTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", payload: {id}} as const
}

export const addTodolistAC = (todolist: Todolist) => {
    return {type: "ADD-TODOLIST", payload: {todolist}} as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload} as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload} as const
}

export const setTodolistsAC = (todolists: Array<Todolist>) => {
    return {type: "SET-TODOLISTS", todolists} as const
}

// Thunks
// thunk (санка) - функция, которая принимает dispatch, getState (опционально) и
// предназначена для того, чтобы внутри нее делать побочные эффекты (запросы на сервер) и диспатчить action или
// другие thunks

export const fetchTodolistsThunkTC = () => {
    return (dispatch: Dispatch) => {
        // внутри санки можно делать побочные эффекты (запросы на сервер например)
        todolistsApi.getTodolists()
            .then((res) => {
                // и диспатчить экшены (action) или другие санки (thunk)
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const deleteTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTodolist(id)
            .then((res) => {
                dispatch(deleteTodolistAC(id))
            })
    }
}

export const updateTodolistTitleTC = (payload: { id: string, title: string }) => {
    return (dispatch: Dispatch) => {
        todolistsApi.updateTodolist(payload)
            .then((res) => {
                dispatch(changeTodolistTitleAC(payload))
            })
    }
}