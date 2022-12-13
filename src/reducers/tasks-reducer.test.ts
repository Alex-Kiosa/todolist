import {addTaskAC, removeTaskAC, tasksReducer} from "./task-reducer";
import {TaskStateType} from "../App";
import {v1} from "uuid";

test('task should be added in correct todolist', ()=>{
    const startState: TaskStateType = {
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

    const endState = tasksReducer(startState, addTaskAC("Oil", "todolistId2"))

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(3)
    expect(endState["todoListId2"][0].id).toBeDefined()
    expect(endState["todoListId2"][0].title).toBe("Oil")
    expect(endState["todoListId2"][0].isDone).toBe(false)
})

test('task should be removed in correct todolist', () => {
    const startState: TaskStateType = {
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

    const endState = tasksReducer(startState, removeTaskAC("todoListId1", "2"))

    expect(endState["todoListId1"].length).toBe(2)
    expect(endState["todoListId2"].length).toBe(2)
    expect(endState["todoListId1"].every(t => t.id !== "2")).toBe(true)
})