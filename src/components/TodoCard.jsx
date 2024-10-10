import React, { useEffect, useState } from 'react';
import bgColors from '../utils/randomColor';
import { MdDelete } from "react-icons/md";
import { toast, Bounce } from 'react-toastify'; // Added Bounce import
import 'react-toastify/dist/ReactToastify.css'; // Make sure you have toastify CSS
import EditTodos from './EditTodos';

const TodoCard = ({ TaskNum, todo_id, description }) => {
    // Delete button handler
    const deleteTodo = async (id) => {
        try {
            const dltTodo = await fetch(`https://pern-todo-backend-sugr.onrender.com/todos/${id}`, {
                method: "DELETE",
            });

            if (dltTodo.status == 200) { // Checking if deletion is successful
                toast.success("Successfully Deleted", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } 
        } catch (error) {
            console.error("Error deleting todo:", error.message);
            toast.error("Error occurred. Try again!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    // Set a random background color only once when the component is mounted
    const [bgColor, setBgColor] = useState('');

    useEffect(() => {
        // Generate a random background color once and store it in state
        const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
        setBgColor(randomBgColor);
    }, []); // Removed bgColor from dependencies to run only once

    return (
        <section
            className={`w-[18rem] h-fit box-border p-4 flex rounded-xl ring-2 ring-offset-white relative bg-white`}
            style={{ backgroundImage: bgColor, backdropFilter: 0.8 }}>
            {/* Task content */}
            <div className=''>
                <div className='flex gap-2 items-center font-semibold'>Task: {TaskNum}</div>
                <div className='md:w-[10rem] w-[14rem] capitalize font-semibold mt-2'>{description}</div>
            </div>
            
            {/* Edit and Delete buttons */}
            <div className='absolute right-0 mr-2 flex justify-center items-center gap-2'>
                <button >
                    <EditTodos todo = {description} todo_id = {todo_id}/>
                </button>
                <button
                    onClick={() => deleteTodo(todo_id)} // Delete the task by ID
                    className='bg-red-500 md:text-md text-sm text-text-color p-2 rounded-full flex justify-center items-center'
                >
                    <MdDelete />
                </button>
            </div>
        </section>
    );
};

export default TodoCard;
