import React, { useEffect, useState } from 'react';
import '../App.css';
import TodoCard from './TodoCard';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false); // State to track loading status


    const getAllTodos = async () => {
        setLoading(true); // Set loading to true when starting to fetch data
        try {
            const response = await fetch('https://pern-todo-backend-sugr.onrender.com/todos/');
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (error) {
            console.error('Error fetching todos:', error.message);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    useEffect(() => {
        getAllTodos();
    }, [todos]);

    return (
        <section className='md:h-[70vh] h-[60vh] w-auto flex gap-5 md:flex-row flex-col md:justify-normal md:items-start justify-center items-center md:m-0 mt-5'>
            <section className=' md:w-[70vw] w-full h-full rounded-xl relative'>
                <div className='h-full w-full flex flex-wrap overflow-y-auto p-4 overflow-clip gap-4 scrollbar justify-center flex-1 md:justify-normal '>
                    {todos.map((todo) => (
                        <TodoCard
                            key={todo.todo_id}
                            TaskNum={todos.indexOf(todo) + 1}
                            todo_id={todo.todo_id}
                            description={todo.description}
                        />
                    ))}
                </div>
            </section>
            <section className=' md:w-[25vw] h-full  rounded-xl'>
                <div className='flex flex-col justify-center items-center md:p-4 md:gap-3 px-3 py-1'>
                    <h1 className='gradient-text text-3xl font-semibold'>Status</h1>
                   <p className='text-text-color text-xl font-semibold'>Total Tasks: {todos.length}</p>
                </div>
            </section>
        </section>
    );
};

export default ListTodos;
