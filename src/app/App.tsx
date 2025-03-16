import React from 'react';
import './App.css';
import {TaskProps} from '../components/Todolist';
import {Container, CssBaseline} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {ThemeProvider} from "@mui/material/styles";
import {Header} from "../Header";
import {getTheme} from "../common/theme/theme";
import {Main} from "../Main";

export type FilterValues = "all" | "active" | "completed";
export type TodolistProps = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: Array<TaskProps>
}

type ThemeMode = 'dark' | 'light'

// CRUD operations
// create ++
// reade ++
// update +
// delete ++

export const App = () => {
    const themeMode = useSelector<AppRootState, ThemeMode>(state => state.app.themeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Container>
                <Header/>
                <Main/>
            </Container>
        </ThemeProvider>
    )
}

export default App;
