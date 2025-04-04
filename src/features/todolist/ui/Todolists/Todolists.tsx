import { Box, Grid, Paper } from "@mui/material"
import { Todolist } from "./Todolist/Todolist"
import React from "react"
import { useAppSelector } from "common/hooks"
import { todolistSelectors } from "../../model/todolistsSelectors"

export const Todolists = () => {
  const todolists = useAppSelector(todolistSelectors)

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid item xs={12} md={6} lg={4} key={tl.id}>
            <Paper variant={"outlined"}>
              <Box sx={{ p: 2 }}>
                <Todolist key={tl.id} todolist={tl} />
              </Box>
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
