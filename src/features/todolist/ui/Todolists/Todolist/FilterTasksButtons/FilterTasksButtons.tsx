import { Button, Stack } from "@mui/material"
import React from "react"
import { changeTodolistFilterAC, FilterValuesType, DomainTodolist } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ id, filter }))
  }

  return (
    <Stack direction={"row"} spacing={2}>
      <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => changeFilterTasksHandler("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "contained" : "outlined"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "contained" : "outlined"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Stack>
  )
}
