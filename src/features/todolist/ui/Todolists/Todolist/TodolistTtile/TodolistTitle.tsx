import {EditableSpan} from "../../../../../../common/components/EditableSpan";
import React from "react";
import {TodolistProps} from "../../../../../../app/App";
import {changeTodolistTitleAC, removeTodolistAC} from "../../../../../../model/todolists-reducer";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: TodolistProps
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const changeTodoListTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    const removeTodoListHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    return <>
        <h3><EditableSpan value={title} onChange={changeTodoListTitleHandler}/></h3>
        <IconButton aria-label="delete" onClick={removeTodoListHandler} sx={{alignSelf: "center"}}>
            <DeleteIcon/>
        </IconButton>
    </>
}