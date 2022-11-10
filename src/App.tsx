import React from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const tasks_1 = Array<TaskType>

function App() {
    const todoListTitle_1 = "What to learn";
    const todoListTitle_2 = "What to buy";


    return (
        <div className="App">
            <TodoList title={todoListTitle_1}/>
            <TodoList title={todoListTitle_2}/>
        </div>
    );
}

export default App;
