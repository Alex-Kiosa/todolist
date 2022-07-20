import {FilterValuesType, TodoLIstType} from "../App";

// action - объект, который описывает action
type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST" // тип преобразования
    id: string
}

type AddTodoLIstAT = {
    type: "ADD-TODOLIST" //
    title: string
    id: string
}

type ChangeTodoListTitle = {
    type: "CHANGE-TODOLIST-TITLE"
    newTodoListTitle: string
    id: string
}

type ChangeTodoListFilter = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValuesType
    id: string
}

type ActionType = RemoveTodoListAT | AddTodoLIstAT | ChangeTodoListTitle | ChangeTodoListFilter

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

export const todoListsReducer = (todoLists: Array<TodoLIstType>, action: ActionType): Array<TodoLIstType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoLIstType = {id: action.id, title: action.title, filter: "all"}
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl =>
                tl.id === action.id ?
                    {id: action.id, title: action.newTodoListTitle, filter: tl.filter} :
                    tl
            )
        case "CHANGE-TODOLIST-FILTER":
            const findTodoList = todoLists.find(tl => tl.id === action.id)
            if (findTodoList) {
                findTodoList.filter = action.value
                return [...todoLists]
            } else {
                return todoLists
            }
        default:
            return todoLists
    }
}

//action creator - для созданиия action объектов
export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({
    type: "REMOVE-TODOLIST",
    id
})

export const AddTodoListAC = (title: string, id: string): AddTodoLIstAT => ({
    type: "ADD-TODOLIST",
    title,
    id
})

export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitle => ({
    type: "CHANGE-TODOLIST-TITLE",
    newTodoListTitle: title,
    id
})

export const ChangeTodoListFilterAC = (value: FilterValuesType, id: string): ChangeTodoListFilter => ({
    type: "CHANGE-TODOLIST-FILTER",
    value,
    id
})