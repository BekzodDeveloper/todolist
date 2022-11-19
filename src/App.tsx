import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";

export type TaskType = {
    id: number
    isDone: boolean
    title: string
}

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "Jscript", isDone: true},
        {id: 3, title: "React", isDone: false}
    ])

    const removeTask = (taskId: number) => {
        let filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
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
            />
        </div>
    );
}

export default App;
