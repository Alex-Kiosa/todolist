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

function AppWithReducers() {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Chiсken", isDone: true},
            {id: v1(), title: "Fruits", isDone: true},
            {id: v1(), title: "Onion", isDone: false},
        ]
    })

    const addTodoList = (title: string) => {
        debugger
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    const changeTodoListTitle = (id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title)
        dispatchToTodolistsReducer(action)
    }

    const removeTodoList = (id: string) => {
        const action = removeTodolistAC(id)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    const changeTodolistFilter = (id: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(id, value)
        dispatchToTodolistsReducer(action)
    }

    const addTask = (todoListId: string, title: string) => {
        const action = addTaskAC(title, todoListId)
        dispatchToTasksReducer(action)
    }

    const changeTaskStatus = (todoListId: string, id: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todoListId, id, isDone,)
        dispatchToTasksReducer(action)
    }

    const changeTaskTitle = (todoListId: string, id: string, newTitle: string) => {
        const action = changeTaskTitleAC(todoListId, id, newTitle)
        dispatchToTasksReducer(action)
    }

    const removeTask = (todoListId: string, id: string, ) => {
        const action = removeTaskAC(id, todoListId)
        dispatchToTasksReducer(action)
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
                        todoLists.map(tl => {
                            let tasksForTodolist = tasksObj[tl.id];

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

export default AppWithReducers;
