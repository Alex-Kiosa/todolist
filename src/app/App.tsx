import React from "react"
import { TaskProps } from "../features/todolist/ui/Todolists/Todolist/Todolist"
import { Container, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { Header } from "common/components/Header/Header"
import { getTheme } from "common/theme"
import { Main } from "./Main"
import { useAppSelector } from "common/hooks"
import { selectThemeMode } from "./appSelectors"

export type FilterValues = "all" | "active" | "completed"
export type TodolistProps = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksState = {
  [key: string]: Array<TaskProps>
}

// CRUD operations
// create ++
// reade ++
// update +
// delete ++

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Container>
        <Header />
        <Main />
      </Container>
    </ThemeProvider>
  )
}

export default App
