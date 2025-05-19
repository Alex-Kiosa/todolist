import React from "react"
import {Task} from "./Task/Task"
import {List} from "@mui/material"
import {useAppSelector} from "common/hooks/useAppSelector"
import {tasksSelectors} from "../../../../model/tasksSelectors"
import {TodolistDomainType} from "../../../../model/todolists-reducer";
import {TaskStatuses} from "common/enums";

type Props = {
  todolist: TodolistDomainType
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(tasksSelectors)

  let tasksForTodolist = tasks[todolist.id]

  if (todolist.filter === "all") {
    tasksForTodolist = tasks[todolist.id]
  }

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((task) => task.status === TaskStatuses.New)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((task) => task.status === TaskStatuses.Completed)
  }

  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map((task) => (
            <Task key={task.id} todolist={todolist} task={task} />
          ))}
        </List>
      )}
    </>
  )
}
