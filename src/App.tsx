import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "Jscript", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ])

    const removeTask = (taskId: string) => {
        let filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }
    const addNewTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }


    let [filter, setFilter] = useState<FilterValuesType>('all');


    let tasksForDTodoList = tasks;

    switch (filter) {
        case "active":
            tasksForDTodoList = tasks.filter(task => !task.isDone)
            break;
        case "completed":
            tasksForDTodoList = tasks.filter(task => task.isDone)
            break;
        default:
            tasksForDTodoList = tasks;
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                task={tasksForDTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addNewTask={addNewTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
