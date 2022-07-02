import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoLIstType = {
    id: string
    title: string
    filter: FilterValuesType
}

// CRUD operations
// create ++
// reade ++
// update +
// delete ++

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoLIstType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    const [tasksObj, setTasksObj] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Chiсken", isDone: true},
            {id: v1(), title: "Fruits", isDone: true},
            {id: v1(), title: "Onion", isDone: false},
        ]
    })

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoLIstType = {id: newTodoListId, title: title, filter: "all"}
        setTodoLists([newTodoList, ...todoLists])
        setTasksObj({...tasksObj, [newTodoListId]: []})
    }

    const removeTodoList = (todoListId: string) => {
        const newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(newTodoLists)
        delete tasksObj[todoListId]
    }

    const addTask = (taskTitle: string, todoListId: string) => {
        const task = {id: v1(), title: taskTitle, isDone: false}
        const tasks = tasksObj[todoListId]
        tasksObj[todoListId] = [task, ...tasks]
        setTasksObj({...tasksObj})
    }

    const removeTask = (id: string, todoListId: string) => {
        const tasks = tasksObj[todoListId]
        tasksObj[todoListId] = tasks.filter(t => t.id != id)
        setTasksObj({...tasksObj})
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const task = tasksObj[todoListId].find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    const onChangeEditableText = (taskId: string, editedText: string, todoListId: string) => {
        const task = tasksObj[todoListId].find(t => t.id === taskId)
        if (task) {
            task.title = editedText
            setTasksObj({...tasksObj})
        }
    }

    const onChangeTodoListTitle = (todoListId: string, editedText: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = editedText
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map(tl => {
                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTodoList={removeTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            onChange={onChangeEditableText}
                            onChangeTodoListTitle={onChangeTodoListTitle}
                            filter={tl.filter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
