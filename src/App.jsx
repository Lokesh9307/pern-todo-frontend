import { useState } from 'react'

import './App.css'
import InputTodos from './components/InputTodos'
import ListTodos from './components/ListTodos'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen'>
      <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        <InputTodos />
        <ListTodos />
      </div>
    </>
  )
}

export default App
