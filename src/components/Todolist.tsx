import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableText} from "./EditableText";

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
    changeTaskTitle: (taskId: string, editedText: string, todolistId: string) => void
    changeTodoListTitle: (todoListId: string, editedText: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (editedText: string) => props.changeTodoListTitle(props.id, editedText)
    const addTask = (itemTitle: string) => props.addTask(itemTitle, props.id)
    const removeTask = (taskId: string) => props.removeTask(taskId, props.id)

    return (
        <div>
            <h3>
                <EditableText value={props.title} onChange={changeTodoListTitle}/>
                <Button buttonName="Delete" onClick={removeTodoList}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const changeTaskTitle = (editedText: string) => props.changeTaskTitle(t.id, editedText, props.id)

                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.id, newIsDoneValue, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={t.isDone} onChange={changeStatus}/>
                                <EditableText value={t.title} onChange={changeTaskTitle}/>
                                <Button buttonName={"x"} onClick={() => removeTask(t.id)}/>
                            </li>
                        )
                    })
                }
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
