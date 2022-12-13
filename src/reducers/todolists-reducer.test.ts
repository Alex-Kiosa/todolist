import {v1} from "uuid";
import {TodoLIstType} from "../App";
import {
    addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./todolists-reducer";

test("correct todoList should be removed", () => {
    // 1. тестовые данные
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: Array<TodoLIstType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    // 2. вызов тестируемой ф-ции
    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

    // 3. сверка результата с ожиданием
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test("correct todoList should be added", () => {
    // 1. тестовые данные
    const newTodoListId = v1()
    const startState: Array<TodoLIstType> = [
        {id: v1(), title: "What to learn", filter: "all"},
        {id: v1(), title: "What to buy", filter: "all"}
    ]

    const newTodoListTitle = 'New TodoList'

    // 2. вызов тестируемой ф-ции
    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle, newTodoListId))

    // 3. сверка результата с ожиданием
    expect(endState.length).toBe(3)
    expect(endState[2].id).toBe(newTodoListId)
    expect(endState[2].filter).toBe('all')
})

test("correct todoList title should be changed", () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const newTodoListTitle = 'New title'
    const startSate: Array<TodoLIstType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startSate, changeTodoListTitleAC(newTodoListTitle, todoListId1))

    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState.length).toBe(2)
})

test("correct filter of todoList should be changed", () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const newTodoListFilter = 'active'
    const startSate: Array<TodoLIstType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startSate, changeTodoListFilterAC(newTodoListFilter, todoListId1))

    expect(endState[0].filter).toBe(newTodoListFilter)
    expect(endState[1].filter).toBe('all')
})