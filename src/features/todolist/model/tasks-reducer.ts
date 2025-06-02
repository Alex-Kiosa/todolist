import {TasksStateType} from "../../../app/App"
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolists-reducer"
import {DomainTask, UpdateTaskDomainModel, UpdateTaskModel} from "../api/tasksApi.types"
import {Dispatch} from "redux";
import {tasksApi} from "../api/taskApi";
import {RootState} from "../../../app/store";

const initialState: TasksStateType = {}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект, который описывает какое-то событие в приложении)
// согласно прописанному type в этом action (инструкции) я поменяю model

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        }

        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.task.todoListId]:
                    [
                        action.payload.task,
                        ...state[action.payload.task.todoListId]
                    ]
            }
        }

        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].filter((task) => task.id !== action.payload.taskId )
            }
        }

        case "UPDATE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
                    task.id === action.payload.taskId
                        ? {
                            ...task,
                            ...action.payload.domainModel,
                        }
                        : task,
                )
            }
        }

        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolist.id]: []}
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

// Actions types
type ActionsType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof removeTaskAC>
    | AddTodolistAT
    | SetTodolistsAT
    | RemoveTodolistAT

// Action creators
export const createTaskAC = (payload: { task: DomainTask }) => {
    return {type: "ADD-TASK", payload,} as const
}

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
    return {type: "REMOVE-TASK", payload,} as const
}

export const updateTaskAC = (payload: { todolistId: string, taskId: string, domainModel: UpdateTaskDomainModel }) => {
    return {type: "UPDATE-TASK", payload,} as const
}

export const setTasksAC = (payload: {
    tasks: Array<DomainTask>
    todolistId: string
}) => {
    return {type: "SET-TASKS", payload} as const
}

// Thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC({todolistId, tasks}))
            })
    }
}

export const removeTaskTC = (payload: { todolistId: string, taskId: string }) => {
    return (dispatch: Dispatch) => {
        tasksApi.removeTask(payload)
            .then((res) => {
                dispatch(removeTaskAC(payload))
            })
    }
}

export const createTaskTC = (payload: { todolistId: string, title: string }) => {
    return (dispatch: Dispatch) => {
        tasksApi.createTask(payload)
            .then((res) => {
                dispatch(createTaskAC({task: res.data.data.item}))
            })
    }
}

export const updateTaskTC = (payload: { todolistId: string, taskId: string, domainModel: UpdateTaskDomainModel }) => {
    return (dispatch: Dispatch, getState: () => RootState) => {
        const {todolistId, taskId, domainModel} = payload
        const allTasksFromState = getState().tasks
        const allTasksForTodolist = allTasksFromState[todolistId]
        const task = allTasksForTodolist.find(t => t.id === taskId)

        if (task) {
            const model: UpdateTaskModel = {
                title: task.title,
                status: task.status,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                ...domainModel
            }

            tasksApi.updateTask({todolistId, taskId, model})
                .then((res) => {
                    dispatch(updateTaskAC(payload))
                })
        }
    }
}