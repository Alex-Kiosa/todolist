import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [taskTitle, setTaskTitle] = useState("");

    const onchangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const onkeypressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') addTaskHandler()
    }

    const addTaskHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle("")
    }

    const changeFilterHandler = (filterName: FilterValuesType) => {
        props.changeFilter(filterName)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={onchangeInputHandler} onKeyDown={onkeypressInputHandler} value={taskTitle} />
            <Button name={"+"} callback={addTaskHandler} />
        </div>
        <ul>
            {props.tasks.map(t => {
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onClick={() => console.log('a')}/>
                        <span>{t.title}</span>
                        <Button name={"x"} callback={() => removeTaskHandler(t.id)}/>
                    </li>
                )
            })}
        </ul>
        <div>
            <Button name={"all"} callback={() => changeFilterHandler('all')}/>
            <Button name={"active"} callback={() => changeFilterHandler('active')}/>
            <Button name={"completed"} callback={() => changeFilterHandler('active')}/>
        </div>
    </div>
}
