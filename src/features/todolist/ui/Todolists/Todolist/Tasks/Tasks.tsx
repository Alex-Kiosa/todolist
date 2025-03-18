import React from "react";
import {TasksState, TodolistProps} from "../../../../../../app/App";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../../../../model/store";
import {Task} from "./Task/Task";
import {List} from "@mui/material";

type Props = {
    todolist: TodolistProps
}

export const Tasks = ({todolist}: Props) => {
    const tasks = useSelector<AppRootState, TasksState>((state) => state.tasks)

    let tasksForTodolist = tasks[todolist.id];

    if (todolist.filter === "all") {
        tasksForTodolist = tasks[todolist.id];
    }

    if (todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone);
    }

    return <>
        {tasksForTodolist.length === 0
            ? <p>Тасок нет</p>
            :
            <List>
                {tasksForTodolist.map(task => <Task key={task.id} todolist={todolist} task={task}/>)}
            </List>
        }
    </>
}