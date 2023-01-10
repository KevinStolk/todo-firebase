import { db } from './db/firebase'
import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, query, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { AiOutlinePlus } from 'react-icons/ai'
import Todo from './components/Todo'

const styles = {
    body: `h-screen w-screen p-4`,
    container: `max-w-[500px] w-full m-auto rounded-md shadow-xl shadow-gray-400 p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-blue-500 rounded-full text-slate-100`,
    count: `text-center p-2`,
}

function App() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const coll = query(collection(db, 'todos'))
        const unsubscribe = onSnapshot(coll, (querySnapshot) => {
            let todosArr = []
            querySnapshot.forEach((doc) => {
                todosArr.push({ ...doc.data(), id: doc.id })
            });
            setTodos(todosArr)
        })
        // cleanup
        return () => unsubscribe
    }, [])

    const createTodo = async (e) => {
        e.preventDefault(e)
        if (input === '') {
            setError('Please enter a valid todo')
            return
        }
        if (todos.find(todo => todo.text.toLowerCase() === input.toLowerCase())) {
            setError('Todo already exist!')
            return
        }
        await addDoc(collection(db, 'todos'), {
            text: input,
            completed: false
        })
        setInput('')
        setError('')
    }

    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed
        })
    }

    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id))
    }
    return (
        <div className="App">
            <div className={styles.body}>
                <div className={styles.container}>
                    <h1 className={styles.heading}>Todo List</h1>
                    <form onSubmit={createTodo} className={styles.form}>
                        <input value={input} onChange={(e) => setInput(e.target.value)} className={styles.input} type='text' placeholder='Add todo...' />
                        <button className={styles.button}><AiOutlinePlus size={30} /></button>
                    </form>
                    {error ? <p className='text-red-500 text-center my-2'>{error}</p> : ''}                     <ul>
                        {todos.map((todo, i) => (
                            <Todo key={i} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
                        ))}
                    </ul>
                    {todos.length <= 1 ? null : <p className={styles.count}>{`You have ${todos.length} todos`}</p>}
                </div>
            </div>
        </div>
    )
}

export default App
