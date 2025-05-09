import Checkbox from "@mui/material/Checkbox"
import { IconButton, ListItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import React, { ChangeEvent } from "react"
import { TaskProps } from "../../Todolist"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../../../../model/tasks-reducer"
import { TodolistProps } from "../../../../../../../app/App"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { EditableSpan } from "common/components"

type Props = {
  todolist: TodolistProps
  task: TaskProps
}

export const Task = ({ todolist, task }: Props) => {
  const dispatch = useAppDispatch()

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId: todolist.id, taskId: task.id, title }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isDone = e.currentTarget.checked

    dispatch(changeTaskStatusAC({ todolistId: todolist.id, taskId: task.id, isDone }))
  }

  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ todolistId: todolist.id, taskId: task.id }))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} color="secondary" onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton aria-label="delete" onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
