import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3949ab',
        },
        secondary: {
            main: '#D80669',
        },
    },
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
