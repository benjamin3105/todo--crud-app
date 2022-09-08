import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, deleteSingleTodo, toggleTodo}) {
    return (
        <>
            {todos.map((todo) => 
                <>
			    <Todo key={todo.id} todo={todo} deleteSingleTodo={deleteSingleTodo} toggleTodo={toggleTodo} />
                </>
			)}
        </>
    )
}
