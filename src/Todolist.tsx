import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState<string>("")

    const onchangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value)

    const onkeypressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (event.key === 'Enter') addTaskHandler()
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            props.addTask(taskTitle, props.id)
            setTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    const removeTaskHandler = (taskId: string) => props.removeTask(taskId, props.id)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? "error" : ""} onChange={onchangeInputHandler} onKeyDown={onkeypressInputHandler} value={taskTitle}/>
            <Button buttonName="+" onClick={addTaskHandler}/>
            <div className="error-message">{error}</div>
        </div>
        <ul>
            {props.tasks.map(t => {
                const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeStatus(t.id, newIsDoneValue, props.id)
                }

                return (
                    <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={changeStatusHandler}/>
                        <span>{t.title}</span>
                        <Button buttonName={"x"} onClick={() => removeTaskHandler(t.id)}/>
                    </li>
                )
            })}
        </ul>
        <div>
            <Button className={props.filter === "all" ? "active-filter" : ""} buttonName={"All"} onClick={() => props.changeFilter('all', props.id)}/>
            <Button className={props.filter === "active" ? "active-filter" : ""} buttonName={"Active"} onClick={() => props.changeFilter('active', props.id)}/>
            <Button className={props.filter === "completed" ? "active-filter" : ""} buttonName={"Completed"} onClick={() => props.changeFilter('completed', props.id)}/>
        </div>
    </div>
}
