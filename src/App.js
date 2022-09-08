import styles from './App.module.css'
import TodoList from './components/TodoList'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todos'

function App() {

	const [todos, setTodos] = useState([])
	const inputRef = useRef()

	useEffect(() => { // get items local storage
		const storeTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if (storeTodos) setTodos(prevTodos => [...prevTodos, ...storeTodos])
	}, [])

	useEffect(() => { // set items local storage
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
	}, [todos])

	function addTodo() { // adds todo based on inputRef
		const title = inputRef.current.value
		if(title === '') return
		setTodos(prevTodos => { 
			return [...todos, {id: uuidv4(), title: title, complete: false}] 
		})
		inputRef.current.value = null 
	}

	function handleKeyPress(e) { // Listen for Enter keyPress -> addTodo function
		if (e.key === "Enter") {
			addTodo()
		}
	}

	function deleteTodos() { // deletes all todos in array
		setTodos([])
	}

	function deleteSingleTodo(id) { // deletes todo based on id
		const newTodos = todos.filter(todo => todo.id != id )
		setTodos(newTodos)
	}

	function toggleTodo(id) { // toggles complete status
		const newTodos = [...todos]
		const todo = newTodos.find(todo => todo.id === id)
		todo.complete = !todo.complete
		setTodos(newTodos)
	}

	function clearAllDoneTodos() { // clears all complete todo om complete check
		const newTodos = todos.filter(todo => !todo.complete )
		setTodos(newTodos)
	}

	return (
		<div className="App">
			<h1>My Todo App</h1>
			<div className={styles.container}>
				<input 
				className={styles.col}
				type="text"
				placeholder="todo"
				ref={inputRef}
				onKeyPress={(e) => handleKeyPress(e)}
				/>
				<button 
				className={styles.col}
				onClick={addTodo}>Add Todo</button>
				<button 
				className={styles.col}
				onClick={deleteTodos}>Delete all Todos</button>
				<button 
				className={styles.col}
				onClick={clearAllDoneTodos}>Clear all Done Todos</button>
			</div>
			<TodoList todos={todos} deleteSingleTodo={deleteSingleTodo} toggleTodo={toggleTodo}/>	
					
		</div>
	)
}

export default App
