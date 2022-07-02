import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {AddItemForm} from "./components/AddItemForm";
import {EditableText} from "./components/EditableText";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTodoList: (todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    onChange: (taskId: string, editedText: string, todolistId: string) => void
    onChangeTodoListTitle: (todoListId: string, editedText: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const removeTodoListHandler = () => props.removeTodoList(props.id)

    const addTask = (itemTitle: string) => {
        props.addTask(itemTitle, props.id)
    }

    const removeTaskHandler = (taskId: string) => props.removeTask(taskId, props.id)

    const onChangeTodoListTitle = (editedText: string) => {
        props.onChangeTodoListTitle(props.id, editedText)
    }

    return (
        <div>
            <h3>
                <EditableText value={props.title} onChange={onChangeTodoListTitle}/>
                <Button buttonName={"Удалить"} onClick={removeTodoListHandler}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    const onChangeTaskTitle = (editedText: string) => {
                        props.onChange(t.id, editedText, props.id)
                    }

                    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={t.isDone} onChange={changeStatusHandler}/>
                            <EditableText value={t.title} onChange={onChangeTaskTitle}/>
                            <Button buttonName={"x"} onClick={() => removeTaskHandler(t.id)}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button className={props.filter === "all" ? "active-filter" : ""} buttonName={"All"}
                        onClick={() => props.changeFilter('all', props.id)}/>
                <Button className={props.filter === "active" ? "active-filter" : ""} buttonName={"Active"}
                        onClick={() => props.changeFilter('active', props.id)}/>
                <Button className={props.filter === "completed" ? "active-filter" : ""} buttonName={"Completed"}
                        onClick={() => props.changeFilter('completed', props.id)}/>
            </div>
        </div>
    )
}
