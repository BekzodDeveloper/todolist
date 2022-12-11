import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import styles from "./TodoList.module.css";

type TodoListPropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addNewTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: string
}


const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    const addNewTask = () => {
        if (title.trim() !== "") {
            props.addNewTask(title.trim())
            setTitle('')
        } else {
            setError("Title is required!")
        }

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addNewTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? styles.error : ''}
                />
                <button onClick={addNewTask}>+</button>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
            <ul>

                {props.task.map(t => {
                    const onClickHandler = () => props.removeTask(t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue)
                    }

                    return <li key={t.id} className={t.isDone ? styles.iDone : ""}>
                        <button onClick={onClickHandler}>✖</button>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeHandler}
                        />
                        <span>{t.title}</span>
                    </li>
                })
                } </ul>
            <div>
                <button className={props.filter === "all" ? styles.activeFilter : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? styles.activeFilter : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? styles.activeFilter : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;