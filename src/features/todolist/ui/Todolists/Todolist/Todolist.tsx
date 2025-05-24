import React from "react"
import {AddItemForm} from "common/components"
import {Stack} from "@mui/material"
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons"
import {Tasks} from "./Tasks/Tasks"
import {TodolistTitle} from "./TodolistTtile/TodolistTitle"
import {createTaskTC} from "../../../model/tasks-reducer"
import {useAppDispatch} from "common/hooks"
import {TodolistDomainType} from "../../../model/todolists-reducer"

type Props = {
  todolist: TodolistDomainType
}

export function Todolist({ todolist }: Props) {
  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskTC({todolistId: todolist.id, title}))
  }

  return (
    <>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <TodolistTitle todolist={todolist} />
      </Stack>
      <AddItemForm addItem={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}
