import React from "react"
import { Container, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { Header } from "common/components"
import { getTheme } from "common/theme"
import { Main } from "./Main"
import { useAppSelector } from "common/hooks"
import { selectThemeMode } from "./appSelectors"
import { DomainTask } from "../features/todolist/api/tasksApi.types"

export type TasksStateType = {
  [key: string]: Array<DomainTask>
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
