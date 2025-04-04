import React from "react"
import { TodolistProps } from "../../../../../../app/App"
import { Task } from "./Task/Task"
import { List } from "@mui/material"
import { useAppSelector } from "common/hooks/useAppSelector"
import { tasksSelectors } from "../../../../model/tasksSelectors"

type Props = {
  todolist: TodolistProps
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(tasksSelectors)

  let tasksForTodolist = tasks[todolist.id]

  if (todolist.filter === "all") {
    tasksForTodolist = tasks[todolist.id]
  }

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((task) => !task.isDone)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((task) => task.isDone)
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
