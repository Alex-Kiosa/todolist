import {AppBar, Button, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {My1Icon} from "../../icons/My1Icon";
import {My2Icon} from "../../icons/My2Icon";
import React from "react";
import {changeThemeAC, ThemeMode} from "../../app/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../model/store";

export const Header = () => {
    const themeMode = useSelector<AppRootState, ThemeMode>(state => state.app.themeMode)

    const dispatch = useDispatch()

    const changeThemeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <div>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Logout</Button>
                    <IconButton sx={{ ml: 1 }} onClick={changeThemeModeHandler} color="inherit">
                        {themeMode === 'light' ? <My1Icon/> : <My2Icon/>}
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}