import React, { Fragment, useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { AiFillCloseCircle } from "react-icons/ai";
import '../App.css';
import { toast, ToastContainer, Bounce } from 'react-toastify';  // Import 'Bounce'
import 'react-toastify/dist/ReactToastify.css';

const InputTodos = () => {
    const [description, setDescription] = useState("");

     
    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();  // Prevent page reload

        // Validate input: show error toast if empty
        if (description.trim() === "" &&  description.length > 250) {
            toast.error('Input field cannot be empty!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,  // Use Bounce transition
            });
            return; // Exit if input is empty
        }

        

        try {
            const body = { description };
            const response = await fetch("https://pern-todo-backend-sugr.onrender.com/todos/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.status == 200) { // Checking if deletion is successful
                toast.success("Task Created", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
        })};

            // Clear input after successful submission
            setDescription("");
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    // Clear the input field
    const clearInput = () => {
        setDescription("");  // Clear input value
    };

    return (
        <Fragment>
            <div className='w-full flex justify-center items-center p-[0.95rem]'>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}  // Set the Bounce transition here
                />
                <h1 className='text-center font-semibold text-4xl gradient-text'>Toodle Task</h1>
            </div>
            <section className='w-full h-36 flex justify-center items-center flex-col gap-2'>
                <form
                    onSubmit={handleFormSubmit}  // Use onSubmit instead of onChange
                    className='flex items-center justify-center gap-2 relative'
                >
                    <input
                        type="text"
                        className='md:w-[600px] sm:w-[200px] text-md py-[5px] px-1 pr-10 rounded-md gradient-input'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        maxLength={250}
                        placeholder='Add the Task...'
                    />

                    {/* Show clear button only when input has text */}
                    {description.length > 0 && (
                        <button
                            type="button"
                            onClick={clearInput}
                            className='danger-btn text-text-color py-1 px-2 text-md font-bold rounded-md flex justify-center items-center gap-1 shadow-btn absolute right-[6.5rem]'
                        >
                            <AiFillCloseCircle />
                        </button>
                    )}

                    <button
                        type="submit"  // Make this a submit button
                        className='submit-btn text-text-color text-xl py-1 rounded-md px-3 hover:bg-main-text hover:text-primary-textColor flex items-center justify-center gap-1 duration-500 capitalize shadow-btn'
                    >
                        Add
                        <IoIosAddCircle />
                    </button>
                </form>
            </section>
        </Fragment>
    );
};

export default InputTodos;
