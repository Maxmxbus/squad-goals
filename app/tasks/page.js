'use client';
import { useState } from 'react';
import '../css/tasks.css';

export default function Home() {
    // State to manage tasks
    const [itemsArr, setItemsArr] = useState(() => {
        const storedItems = localStorage.getItem('items');
        return storedItems ? JSON.parse(storedItems) : [];
    });

    // Function to check if array is made
    function arrayMadeOrNot() {
        return !localStorage.getItem('items');
    }

    // Function to add a task
    function addTask() {
        const input = document.getElementById('task');
        if (!input.value) {
            alert('Enter task please 🙃');
            return;
        }
        createItem(input.value);
        input.value = ''; // Clear input after adding task
    }

    // Create item function
    function createItem(item) {
        const newItemsArr = [...itemsArr, item];
        setItemsArr(newItemsArr);
        localStorage.setItem('items', JSON.stringify(newItemsArr));
    }

    // Show tasks function (no longer needed with state, but kept for potential future use)
    function showTasks() {
        return itemsArr;
    }

    // Clear tasks function
    function clearTasks() {
        if (itemsArr.length === 0) {
            alert('There are no items');
            return;
        }
        setItemsArr([]);
        localStorage.setItem('items', JSON.stringify([]));
    }

    // Complete task function
    function completedTask(idx) {
        const newItemsArr = itemsArr.filter((_, index) => index !== idx);
        setItemsArr(newItemsArr);
        localStorage.setItem('items', JSON.stringify(newItemsArr));
    }

    return (
        <>
            <div className="main">
                <h1 className="flex">Your Address: {localStorage.getItem('walletAddress')}</h1>
                <div className='tasks'>
                    <h1 className='tasksHeading border-b-2'> 👇👇👇 Your Tasks 👇👇👇</h1>
                    <div className='tasksContainer'>
                        <ul>
                            {arrayMadeOrNot() ? null : itemsArr.map((el, idx) => (
                                <li className='task' key={idx}>
                                    <button
                                        className="border-b-2 task-init"
                                        onClick={() => completedTask(idx)}
                                    >
                                        {el}  🔴
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='inputField'>
                    <input
                        type="text"
                        id='task'
                        placeholder='Enter Your task here'
                        className='input input-bordered input-secondary w-full max-w-xs'
                    />
                    <button
                        className={"btn btn-outline btn-secondary"}
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                    <button
                        className={"btn btn-outline btn-secondary"}
                        onClick={clearTasks}
                    >
                        Clear Tasks
                    </button>
                </div>
            </div>
        </>
    );
}