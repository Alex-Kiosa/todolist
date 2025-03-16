import {Box, Grid, Paper} from "@mui/material";
import {Todolist} from "./components/Todolist";
import React from "react";
import {useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TodolistProps} from "./app/App";

export const Todolists = () => {
    const todolists = useSelector<AppRootState, Array<TodolistProps>>((state) => state.todolists)

    return <>
        {todolists.map(tl => {
            return (
                <Grid item xs={12} md={6} lg={4} key={tl.id}>
                    <Paper variant={"outlined"}>
                        <Box sx={{p: 2}}>
                            <Todolist key={tl.id} todolist={tl}/>
                        </Box>
                    </Paper>
                </Grid>
            )
        })
        }
    </>
}