import React from 'react'
import styles from './Todo.module.css'

export default function Todo({todo, deleteSingleTodo, toggleTodo}) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <li className={styles.todo}>
        <label className={todo.complete ? styles.done : styles.not_done }>
            <input className={styles.checkbox} type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            {todo.title} 
            <button 
            className={styles.remove}
            onClick={() => deleteSingleTodo(todo.id)}>X</button>
        </label>
        </li>
    )
}
