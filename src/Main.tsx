import {Box, Grid} from "@mui/material";
import React from "react";
import {useDispatch} from "react-redux";
import {AddItemForm} from "./components/AddItemForm";
import {addTodolistAC} from "./state/todolists-reducer";
import {Todolists} from "./Todolists";

export const Main = () => {
    const dispatch = useDispatch()

    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return <>
        <Box style={{margin: "85px 0 25px 0"}}><AddItemForm addItem={addTodoList}/></Box>
        <Grid container sx={{flexGrow: 1}} spacing={3}>
            <Todolists/>
        </Grid>
    </>
}