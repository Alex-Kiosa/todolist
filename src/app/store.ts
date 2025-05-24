import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from "redux"
import { todolistsReducer } from "../features/todolist/model/todolists-reducer"
import { tasksReducer } from "../features/todolist/model/tasks-reducer"
import { appReducer } from "./app-reducer"
import {thunk, ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
})

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk) )

// export type AppDispatch = typeof store.dispatch

// Создадим тип, который говорит TypeScript, что dispatch может принимать Thunk-функции помимо обычных actions.
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

export type RootState = ReturnType<typeof rootReducer>
// Life hack for automatic typing


// @ts-ignore
window.store = store
