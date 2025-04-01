import Checkbox from "@mui/material/Checkbox"
import React, {ChangeEvent, useEffect, useState} from "react"
import {AddItemForm} from "../common/components/AddItemForm"
import {EditableSpan} from "../common/components/EditableSpan"
import {Todolist} from "../features/todolist/api/todolistsApi.types";
import {DomainTask, tasksApi, UpdateTaskModel} from "../features/todolist/api/tasksApi.types";
import {todolistsApi} from "../features/todolist/api/todolistsApi";

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Array<Todolist>>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        todolistsApi.getTodolists().then((res) => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach(tl => {
                tasksApi.getTasks(tl.id).then((res) => {
                    setTasks((prevState) => {
                        return {...prevState, [tl.id]: res.data.items}
                    })
                })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        todolistsApi.createTodolist(title).then((res) => {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
        })
    }

    const removeTodolistHandler = (id: string) => {
        todolistsApi.deleteTodolist(id).then((res) => {
            const newTodolists = todolists.filter(tl => tl.id !== id)
            setTodolists(newTodolists)
        })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        todolistsApi.updateTodolist({id, title}).then((res) => {
            const newTodolists = todolists.map(item => item.id === id ? {...item, title} : item)
            setTodolists(newTodolists)
        })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        tasksApi.createTask({todolistId, title}).then(res => {
            const newTask = res.data.data.item
            setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        tasksApi.deleteTasks({todolistId, taskId}).then((res) => {
            const newTasks = tasks[todolistId].filter(task => task.id !== taskId)
            setTasks({...tasks, [todolistId]: newTasks})
        })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? 2 : 0

        const model: UpdateTaskModel = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        tasksApi.updateTask({todolistId: task.todoListId, taskId: task.id, model}).then((res) => {
            const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? {...t, ...model} : t))
            setTasks({...tasks, [task.todoListId]: newTasks})
        })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {
        const model: UpdateTaskModel = {
            title: title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        tasksApi.updateTask({todolistId: task.todoListId, taskId: task.id, model}).then((res) => {
                const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? {...t, ...model} : t))
                setTasks({...tasks, [task.todoListId]: newTasks})
            })
    }

    return (
        <div style={{margin: "20px"}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl: Todolist) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan value={tl.title}
                                          onChange={(title: string) => updateTodolistHandler(tl.id, title)}/>
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox checked={task.status === 2 ? true : false}
                                                  onChange={(e) => changeTaskStatusHandler(e, task)}/>
                                        <EditableSpan value={task.title}
                                                      onChange={(title) => changeTaskTitleHandler(title, task)}/>
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: "1px solid black",
    margin: "20px 0",
    padding: "10px",
    width: "300px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
}