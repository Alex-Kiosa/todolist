import React from 'react';
import './App.css';
import {TaskType, Todolist} from '../components/Todolist';
import {AddItemForm} from "../components/AddItemForm";
import {AppBar, Box, Button, Container, CssBaseline, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {ThemeProvider} from "@mui/material/styles";
import {getTheme} from "../common/theme/theme";
import {changeThemeAC} from "./app-reducer";
import {My1Icon} from "../icons/My1Icon";
import {My2Icon} from "../icons/My2Icon";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type ThemeMode = 'dark' | 'light'

// CRUD operations
// create ++
// reade ++
// update +
// delete ++

function App() {
    const todolists = useSelector<AppRootState, Array<TodolistType>>((state) => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks)
    const themeMode = useSelector<AppRootState, ThemeMode>(state => state.app.themeMode)

    const theme = getTheme(themeMode)

    const dispatch = useDispatch()

    const changeThemeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const changeTodoListTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    const removeTodoList = (id: string) => {
        dispatch(removeTodolistAC(id))
    }

    const changeTodolistFilter = (id: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id, value}))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC({todoListId, title}))
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todoListId, taskId, isDone}))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, taskTitle: string) => {
        dispatch(changeTaskTitleAC({todoListId, taskId, taskTitle}))
    }

    const removeTask = (todoListId: string, taskId: string,) => {
        dispatch(removeTaskAC({todoListId, taskId}))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container fixed>
                <AppBar position="fixed" color="primary">
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <Button color="inherit">Login</Button>
                            <Button color="inherit">Logout</Button>
                            {/*<Switch color={'default'} onChange={changeThemeModeHandler}/>*/}
                            <IconButton sx={{ ml: 1 }} onClick={changeThemeModeHandler} color="inherit">
                                {themeMode === 'light' ? <My1Icon/> : <My2Icon/>}
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Box style={{margin: "85px 0 25px 0"}}><AddItemForm addItem={addTodoList}/></Box>
                <Grid container sx={{flexGrow: 1}} spacing={3}>
                    {
                        todolists.map(tl => {
                            let tasksForTodolist = tasks[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                            }

                            return (
                                <Grid item xs={12} md={6} lg={4} key={tl.id}>
                                    <Paper variant={"outlined"}>
                                        <Box sx={{p: 2}}>
                                            <Todolist
                                                key={tl.id}
                                                id={tl.id}
                                                title={tl.title}
                                                changeTodoListTitle={changeTodoListTitle}
                                                filter={tl.filter}
                                                removeTodoList={removeTodoList}

                                                tasks={tasksForTodolist}

                                                addTask={addTask}
                                                changeFilter={changeTodolistFilter}
                                                changeStatus={changeTaskStatus}
                                                changeTaskTitle={changeTaskTitle}
                                                removeTask={removeTask}
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default App;
