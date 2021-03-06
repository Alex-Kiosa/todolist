import React, {useState} from 'react';
import {v1} from "uuid";
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography, Box, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoLIstType = {
    id: string
    title: string
    filter: FilterValuesType
}

// CRUD operations
// create ++
// reade ++
// update +
// delete ++

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoLIstType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    const [tasksObj, setTasksObj] = useState({
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
        const newTodoListId = v1()
        const newTodoList: TodoLIstType = {id: newTodoListId, title: title, filter: "all"}
        setTodoLists([newTodoList, ...todoLists])
        setTasksObj({...tasksObj, [newTodoListId]: []})
    }

    const changeTodoListTitle = (todoListId: string, editedText: string) => {
        const newTodoList = todoLists.find(tl => tl.id === todoListId)
        if (newTodoList) {
            newTodoList.title = editedText
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (todoListId: string) => {
        const newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(newTodoLists)
        delete tasksObj[todoListId]
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        const newTodoList = todoLists.find(tl => tl.id === todoListId)
        if (newTodoList) {
            newTodoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    const addTask = (taskTitle: string, todoListId: string) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        const newTasks = tasksObj[todoListId]
        tasksObj[todoListId] = [newTask, ...newTasks]
        setTasksObj({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const newTask = tasksObj[todoListId].find(t => t.id === taskId)
        if (newTask) {
            newTask.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    const changeTaskTitle = (taskId: string, editedText: string, todoListId: string) => {
        const newTask = tasksObj[todoListId].find(t => t.id === taskId)
        if (newTask) {
            newTask.title = editedText
            setTasksObj({...tasksObj})
        }
    }

    const removeTask = (id: string, todoListId: string) => {
        const newTasks = tasksObj[todoListId]
        tasksObj[todoListId] = newTasks.filter(t => t.id != id)
        setTasksObj({...tasksObj})
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
                <Grid sx={{flexGrow: 1}} container spacing={2} style={{margin: "80px 0 0 0"}}>
                    <Grid item xs={12}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                </Grid>
                <Grid sx={{flexGrow: 1}} container spacing={2}>
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
                                <Grid item xs={12} md={4}>
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
                                                changeFilter={changeFilter}
                                                changeStatus={changeStatus}
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

export default App;
