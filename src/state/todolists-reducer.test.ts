import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test("correct todoList should be removed", () => {
    // 1. тестовые данные
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    // 2. вызов тестируемой ф-ции
    const endState = todolistsReducer(startState, removeTodolistAC(todoListId1))

    // 3. сверка результата с ожиданием
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test("correct todoList should be added", () => {
    // 1. тестовые данные
    const startState: Array<TodolistType> = [
        {id: v1(), title: "What to learn", filter: "all"},
        {id: v1(), title: "What to buy", filter: "all"}
    ]

    const newTodoListTitle = 'New TodoList'

    // 2. вызов тестируемой ф-ции
    const endState = todolistsReducer(startState, addTodolistAC(newTodoListTitle))
    const newTodolistId = v1()

    // 3. сверка результата с ожиданием
    expect(endState.length).toBe(3)
    expect(endState[2].filter).toBe('all')
    expect(endState[2].id).toBeDefined()
})

test("correct todoList title should be changed", () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const newTodoListTitle = 'New title'
    const startSate: Array<TodolistType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startSate, changeTodolistTitleAC(todoListId1, newTodoListTitle))

    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[1].title).toBe('What to buy')
    expect(endState.length).toBe(2)
})

test("correct filter of todoList should be changed", () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const newTodoListFilter = 'active'
    const startSate: Array<TodolistType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startSate, changeTodolistFilterAC(todoListId1, newTodoListFilter))

    expect(endState[0].filter).toBe(newTodoListFilter)
    expect(endState[1].filter).toBe('all')
})