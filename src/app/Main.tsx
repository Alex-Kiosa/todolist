import {Box, Grid} from "@mui/material"
import React from "react"
import {AddItemForm} from "common/components"
import {addTodolistTC} from "../features/todolist/model/todolists-reducer"
import {Todolists} from "../features/todolist/ui/Todolists/Todolists"
import {useAppDispatch} from "common/hooks"

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodoList = (title: string) => {
    dispatch(addTodolistTC(title))
  }

  return (
    <>
      <Box style={{ margin: "85px 0 25px 0" }}>
        <AddItemForm addItem={addTodoList} />
      </Box>
      <Grid container sx={{ flexGrow: 1 }} spacing={3}>
        <Todolists />
      </Grid>
    </>
  )
}
