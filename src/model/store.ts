import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {appReducer} from "../app/app-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootState = ReturnType<typeof rootReducer>
// Lifelike for automatic typing

// @ts-ignore
window.store = store