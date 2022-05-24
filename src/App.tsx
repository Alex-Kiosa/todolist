import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 4, title: "React", isDone: false}
    ];

    const tasks2 = [
        {id: 1, title: "Buy products", isDone: true},
        {id: 2, title: "Take out the trash", isDone: false},
        {id: 4, title: "Rest", isDone: false}
    ];

    return (
        <div className="App">
            <Todolist title={"What to learn 1"} tasks={tasks1}/>
            <Todolist title={"Life"} tasks={tasks2}/>
        </div>
    );
}

export default App;
