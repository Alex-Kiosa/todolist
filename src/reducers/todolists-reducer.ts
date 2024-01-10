import {FilterValuesType, TodoLIstType} from "../App";

// action - объект, который описывает какое-то событие в приложении
type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST" // тип преобразования
    id: string
}

type AddTodoLIstAT = {
    type: "ADD-TODOLIST" //
    title: string
    id: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    newTodoListTitle: string
    id: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValuesType
    id: string
}

type ActionsType = RemoveTodoListAT | AddTodoLIstAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

export const todoListsReducer = (todoLists: Array<TodoLIstType>, action: ActionsType): Array<TodoLIstType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [
                ...todoLists,
                {id: action.id, title: action.title, filter: "all"}
            ]

        case 'CHANGE-TODOLIST-TITLE':
            const newTodoLists = [...todoLists]
            const todoList = newTodoLists.find(tl => tl.id === action.id)
            if (todoList) todoList.title = action.newTodoListTitle

            return newTodoLists

        case 'CHANGE-TODOLIST-FILTER':
            const newTodoLists2 = [...todoLists]
            const todoList2 = newTodoLists2.find(tl => tl.filter)
            if (todoList2) todoList2.filter = 'active'

            return newTodoLists2

        default:
            throw new Error('I dont\'t understand this action type')
    }
}

// action creators - нужны для создания action объектов
// другими словами responsibility action creator - создание объекта action
// action creators - классический пример реализации паттерна фабричных ф-ций
export const removeTodoListAC = (id: string): RemoveTodoListAT => ({
    type: "REMOVE-TODOLIST",
    id
})

export const addTodoListAC = (title: string, id: string): AddTodoLIstAT => ({
    type: "ADD-TODOLIST",
    title,
    id
})

export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    newTodoListTitle: title,
    id
})

export const changeTodoListFilterAC = (value: FilterValuesType, id: string): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    value,
    id
})