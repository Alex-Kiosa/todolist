import Checkbox from "@mui/material/Checkbox"
import {IconButton, ListItem} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import React, {ChangeEvent} from "react"
import {
    removeTaskTC, updateTaskTC
} from "../../../../../model/tasks-reducer"
import {getListItemSx} from "./Task.styles"
import {useAppDispatch} from "common/hooks/useAppDispatch"
import {EditableSpan} from "common/components"
import {DomainTodolist} from "../../../../../model/todolists-reducer"
import {TaskStatuses} from "common/enums"
import {DomainTask} from "../../../../../api/tasksApi.types"

type Props = {
    todolist: DomainTodolist
    task: DomainTask
}

export const Task = ({todolist, task}: Props) => {
    const dispatch = useAppDispatch()

    const changeTaskTitleHandler = (title: string) => {
        task = {...task, title}

        dispatch(updateTaskTC({todolistId: todolist.id, taskId: task.id, domainModel: task}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        task = {...task, status}

        dispatch(updateTaskTC({todolistId: todolist.id, taskId: task.id, domainModel: task}))
    }

    const removeTaskHandler = () => {
        dispatch(removeTaskTC({todolistId: todolist.id, taskId: task.id}))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatuses.Completed)}>
            <div>
                <Checkbox
                    checked={task.status === TaskStatuses.Completed}
                    color="secondary"
                    onChange={changeTaskStatusHandler}
                />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}
