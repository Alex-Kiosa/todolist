import {EditableSpan} from "common/components"
import React from "react"
import {deleteTodolistTC, updateTodolistTitleTC} from "../../../../model/todolists-reducer"
import DeleteIcon from "@mui/icons-material/Delete"
import {IconButton} from "@mui/material"
import {useAppDispatch} from "common/hooks"
import {Todolist} from "../../../../api/todolistsApi.types"

type Props = {
  todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const changeTodoListTitleHandler = (title: string) => {
    dispatch(updateTodolistTitleTC({ id, title }))
  }

  const removeTodoListHandler = () => {
    dispatch(deleteTodolistTC(id))
  }

  return (
    <>
      <h3>
        <EditableSpan value={title} onChange={changeTodoListTitleHandler} />
      </h3>
      <IconButton aria-label="delete" onClick={removeTodoListHandler} sx={{ alignSelf: "center" }}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}
