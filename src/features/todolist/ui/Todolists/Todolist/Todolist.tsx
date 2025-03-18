import React from 'react';
import {TodolistProps} from '../../../../../app/App';
import {AddItemForm} from "../../../../../common/components/AddItemForm";
import {Stack} from "@mui/material";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTtile/TodolistTitle";
import {addTaskAC} from "../../../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";

export type TaskProps = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    todolist: TodolistProps
}

export function Todolist({todolist}: Props) {
    const dispatch = useAppDispatch()

    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC({todolistId: todolist.id, title}))
    }

    return <>
        <Stack direction="row" sx={{justifyContent: 'space-between'}}>
            <TodolistTitle todolist={todolist}/>
        </Stack>
        <AddItemForm addItem={addTaskCallback}/>
        <Tasks todolist={todolist}/>
        <FilterTasksButtons todolist={todolist}/>
    </>
}
