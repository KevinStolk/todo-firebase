import React from 'react'
import { FaRegTrashAlt, FaCheck } from 'react-icons/fa'

const styles = {
    li: `flex justify-between bg-blue-500 p-4 my-2 capitalize text-white rounded-md`,
    todoComplete: `flex justify-between bg-green-500 text-white rounded-md p-4 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    checkmark: `mt-1 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center hover:cursor-pointer`,
    trashIcon: `hover:text-red-500 transition`
}

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
    return (
        <li className={todo.completed ? styles.todoComplete : styles.li}>
            <div className={styles.row}>
                <FaCheck className={styles.checkmark} onClick={() => toggleComplete(todo)} />
                <p onClick={() => toggleComplete(todo)} className={todo.completed ? styles.textComplete : styles.text}>{todo.text}</p>
            </div>
            <button onClick={() => deleteTodo(todo.id)}><FaRegTrashAlt className={styles.trashIcon} /></button>
        </li>
    )
}

export default Todo
