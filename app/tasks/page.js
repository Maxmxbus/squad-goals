'use client';
import '../css/tasks.css';
import { useEffect, useState } from 'react';
import { add_task, clear_tasks, get_all_user_tasks } from '../components/kwil';

//Components
import Navigation from "../components/Navigation.js";


export default function Home() {
    // State for task management
    const [taskID, setTaskID] = useState(0);
    const [userTasks, setUserTasks] = useState([]);

    // Function to fetch tasks from the database and update state
    async function showTasks() {
        const tasks = await get_all_user_tasks();
        setUserTasks(tasks);
        // console.log(tasks);
    }

    // Function to add a task to the database
    function addTask() {
        const input = document.getElementById('task');
        if (input.value.trim() === '') {
            alert('Please enter a task');
            return;
        }
        add_task(taskID, input.value.trim())
            .then(data => console.log('Task added, tx hash: ', data))
            .catch(err => console.error('It Failed: ', err));
        setTaskID(taskID + 1);
        input.value = '';
    }

    // Function to clear all tasks
    function clearTasks() {
        clear_tasks()
            .then(data => console.log('Tasks Cleared, tx hash: ', data))
            .catch(err => console.error('It Failed: ', err));
    }

    // Fetch tasks when the component is mounted
    useEffect(() => {
        showTasks();
    });

    return (
        <>
            <Navigation address={localStorage.getItem("walletAddress") ? localStorage.getItem("walletAddress") : "Connect Wallet"} />
            <div className="main">
                <div className='tasks'>
                    <h1 className='tasksHeading border-b-2'> 👇👇👇 Your Tasks 👇👇👇</h1>
                    <div className='tasksContainer'>
                        <ul>
                            {userTasks.map((task, idx) => (
                                <li key={idx}>
                                    <h2>{idx + 1}. {task.description} 🔴</h2>
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
                <button onClick={showTasks}>Refresh Tasks</button>
            </div>
        </>);
}
