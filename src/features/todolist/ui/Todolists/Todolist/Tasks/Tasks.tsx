import React, {useEffect} from "react"
import {Task} from "./Task/Task"
import {List} from "@mui/material"
import {useAppSelector} from "common/hooks/useAppSelector"
import {tasksSelector} from "../../../../model/tasksSelector"
import {DomainTodolist} from "../../../../model/todolists-reducer"
import {TaskStatuses} from "common/enums"
import {fetchTasksTC} from "../../../../model/tasks-reducer";
import {useAppDispatch} from "common/hooks";

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(tasksSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

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
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => (
            <Task key={task.id} todolist={todolist} task={task} />
          ))}
        </List>
      )}
    </>
  )
}
