import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../app/App';
import {AddItemForm} from "./AddItemForm";
import {EditableText} from "./EditableText";
import {Button, IconButton, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTodoList: (todoListId: string) => void
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string,value: FilterValuesType) => void
    addTask: (todoListId: string, taskTitle: string) => void
    changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, editedText: string,) => void
    changeTodoListTitle: (todoListId: string, editedText: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (editedText: string) => props.changeTodoListTitle(props.id, editedText)
    const addTask = (itemTitle: string) => props.addTask(props.id, itemTitle)
    const removeTask = (taskId: string) => props.removeTask(props.id, taskId)

    return (
        <>
            <Stack direction="row" sx={{justifyContent: 'space-between'}}>
                <h3><EditableText value={props.title} onChange={changeTodoListTitle}/></h3>
                <IconButton aria-label="delete" onClick={removeTodoList} sx={{alignSelf: "center"}}>
                    <DeleteIcon />
                </IconButton>
            </Stack>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                        const changeTaskTitle = (editedText: string) => props.changeTaskTitle(props.id, t.id, editedText)

                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(props.id, t.id, newIsDoneValue)
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
            <Stack direction={"row"} spacing={2}>
                <Button
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    onClick={() => props.changeFilter(props.id, 'all')}
                    color={"secondary"}>
                    All
                </Button>
                <Button
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={() => props.changeFilter(props.id, 'active')}
                    color={"secondary"}>
                    Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={() => props.changeFilter(props.id, 'completed')}
                    color={"secondary"}>
                    Completed
                </Button>
            </Stack>
        </>
    )
}
