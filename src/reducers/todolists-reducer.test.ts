import {v1} from "uuid";
import {FilterValuesType, TodoLIstType} from "../App";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./todolists-reducer";

test("correct todoList should be removed", () => {
    // 1. тестовые данные
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: Array<TodoLIstType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    // 2. вызов тестируемой ф-ции
    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId2))

    // 3. сверка результата с ожиданием
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId1)
})

test("correct todoList should be added", () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = "New TodoList"

    const startState: Array<TodoLIstType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle, v1()))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test("correct todoList title should be updated", () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = "New title of todoList"

    const startState: Array<TodoLIstType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(newTodoListTitle, todoListId2))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
})

test("filter of correct todoList should be updated", () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let value: FilterValuesType = "active"

    const startState: Array<TodoLIstType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(value, todoListId2))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(value)
})