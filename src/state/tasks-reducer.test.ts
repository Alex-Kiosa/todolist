import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksState} from "../app/App";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test('task should be added in correct todolist', ()=>{
    const startState: TasksState = {
        "todoListId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListId2": [
            {id: "1", title: "Chiсken", isDone: true},
            {id: "2", title: "Fruits", isDone: true},
        ]
    }

    const endState = tasksReducer(startState, addTaskAC( {todolistId: "todoListId2", title: "Oil"}))

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(3)
    expect(endState["todoListId2"][0].id).toBeDefined()
    expect(endState["todoListId2"][0].title).toBe("Oil")
    expect(endState["todoListId2"][0].isDone).toBe(false)
})

test('task should be removed in correct todolist', () => {
    const startState: TasksState = {
        "todoListId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListId2": [
            {id: "1", title: "Chiсken", isDone: true},
            {id: "2", title: "Fruits", isDone: true},
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC({todolistId: "todoListId1", taskId: "2"}))

    expect(endState["todoListId1"].length).toBe(2)
    expect(endState["todoListId2"].length).toBe(2)
    expect(endState["todoListId1"].every(t => t.id !== "2")).toBe(true)
})

test('status of specific task should be changed', ()=>{
    const startState: TasksState = {
        "todoListId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListId2": [
            {id: "1", title: "Chiсken", isDone: true},
            {id: "2", title: "Fruits", isDone: true},
        ]
    }

    const endState = tasksReducer(startState, changeTaskStatusAC({todolistId: "todoListId1", taskId: "2", isDone: false}))

    expect(endState["todoListId1"][1].isDone).toBe(false)
    expect(endState["todoListId2"][1].isDone).toBe(true)
})

test('title of specific task should be changed', ()=>{
    const startState: TasksState = {
        "todoListId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListId2": [
            {id: "1", title: "Chiсken", isDone: true},
            {id: "2", title: "Fruits", isDone: true},
        ]
    }

    const endState = tasksReducer(startState, changeTaskTitleAC({todolistId: "todoListId1", taskId: "2", title: 'TS'}))

    expect(endState["todoListId1"][1].title).toBe('TS')
    expect(endState["todoListId2"][1].title).toBe('Fruits')
})

test('new property with new array should be added when new todolist is added', ()=>{
    // start state
    const startState: TasksState = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Chiсken", isDone: true},
            {id: "2", title: "Fruits", isDone: true},
        ]
    }

    const newTodoListTitle = 'New TodoList'

    // action
    const endState = tasksReducer(startState, addTodolistAC(newTodoListTitle))
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2")
    if(!newKey) {
        throw Error("kew key should be added")
    }

    // expect result
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', ()=>{
    // start state
    const startState: TasksState = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Chiсken", isDone: true},
            {id: "2", title: "Fruits", isDone: true},
        ]
    }

    // action
    const action = removeTodolistAC("todolistId2")
    const endState = tasksReducer(startState, action)

    // expect result
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(keys[0]).toBe("todolistId1")
})