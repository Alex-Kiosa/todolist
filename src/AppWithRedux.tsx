import React, {useReducer, useState} from 'react';
import {v1} from "uuid";
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography, Box, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// CRUD operations
// create ++
// reade ++
// update +
// delete ++

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const changeTodoListTitle = (id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title)
        dispatch(action)
    }

    const removeTodoList = (id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)
    }

    const changeTodolistFilter = (id: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(id, value)
        dispatch(action)
    }

    const addTask = (todoListId: string, title: string) => {
        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }

    const changeTaskStatus = (todoListId: string, id: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todoListId, id, isDone,)
        dispatch(action)
    }

    const changeTaskTitle = (todoListId: string, id: string, newTitle: string) => {
        const action = changeTaskTitleAC(todoListId, id, newTitle)
        dispatch(action)
    }

    const removeTask = (todoListId: string, id: string,) => {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }

    return (
        <div className="App">
            <Container fixed>
                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolist
                        </Typography>
                        <Button color="inherit">Login</Button>
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
                                <Grid item xs={12} md={6} lg={4}>
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
        </div>
    )
}

export default AppWithRedux;
