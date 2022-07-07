import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from "./AddItemForm";
import {EditableText} from "./EditableText";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

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
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                        const changeTaskTitle = (editedText: string) => props.changeTaskTitle(t.id, editedText, props.id)

                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.id, newIsDoneValue, props.id)
                        }

                        return (
                            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                    checked={t.isDone}
                                    color="secondary"
                                    onChange={changeStatus}
                                />
                                <EditableText value={t.title} onChange={changeTaskTitle}/>
                                <IconButton aria-label="delete" onClick={() => removeTask(t.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    onClick={() => props.changeFilter('all', props.id)}
                    color={"secondary"}>
                    All
                </Button>
                <Button
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={() => props.changeFilter('active', props.id)}
                    color={"secondary"}>
                    Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={() => props.changeFilter('completed', props.id)}
                    color={"secondary"}>
                    Completed
                </Button>
            </div>
        </div>
    )
}
