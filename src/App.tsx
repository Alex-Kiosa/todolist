import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoLIstType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoLIstType>>([
        {id: todoListId1, title: "What to lear", filter: "active"},
        {id: todoListId2, title: "What to buy", filter: "completed"}
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

    const addTask = (taskTitle: string, todoListId: string) => {
        const task = {id: v1(), title: taskTitle, isDone: false}
        const tasks = tasksObj[todoListId]
        tasksObj[todoListId] = [task,...tasks]
        setTasksObj({...tasksObj})
    }

    const removeTask = (id: string, todoListId: string) => {
        const tasks = tasksObj[todoListId]
        const filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj});
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

    return (
        <div className="App">
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
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
