import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from "react-icons/fa";
import '../App.css'

const EditTodos = ({todo, todo_id}) => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(todo);

  // Function to update the description of the todo
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`https://pern-todo-backend-sugr.onrender.com/todos/${todo_id}`, {
        method: "PUT",  // Use PUT to update existing resources
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location("/")
      
    } catch (error) {
      console.log(error.message);  // Log any errors to the console
    }
    setShow(false);  // Close the modal after saving changes
  };

  // Function to close the modal
  const handleClose = () => setShow(false);

  // Function to show the modal
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Edit button */}
      <button className='bg-blue-500 md:text-md text-sm text-text-color p-2 rounded-full flex justify-center items-center' onClick={handleShow}>
        <FaEdit />
      </button>

      {/* Modal for editing todos */}
      <Modal show={show} onHide={handleClose}>
        <section>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>
          <div className='p-2'>
            <input type="text" className='text-xl w-full p-1' value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateDescription}>
              Save Changes
            </Button>
          </Modal.Footer>
        </section>
      </Modal>
    </>
  );
}

export default EditTodos;
