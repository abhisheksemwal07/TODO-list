"use client"
import React, { useState } from 'react';

const Page = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || desc.trim() === "") return;
    setMainTask([...mainTask, { title, desc, completed: false }]);
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const completeHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask[i].completed = !copyTask[i].completed;
    setMainTask(copyTask);
  };

  const renderTask = mainTask.length === 0 
    ? <h2 className={`text-xl ${darkMode ? 'text-zinc-300' : 'text-gray-600'} text-center`}>No tasks available</h2>
    : mainTask.map((t, i) => (
      <li key={i} 
          className={`flex items-center justify-between p-4 mb-4 shadow-lg rounded-lg 
                      ${t.completed ? (darkMode ? 'bg-green-800' : 'bg-green-200') : (darkMode ? 'bg-gradient-to-r from-teal-900 to-blue-800' : 'bg-gradient-to-r from-teal-200 to-blue-300')} 
                      transition-all duration-300`}>
        <div className='flex flex-col w-2/3'>
          <h5 className={`text-xl font-bold ${t.completed ? (darkMode ? 'text-zinc-400 line-through' : 'text-gray-700 line-through') : (darkMode ? 'text-zinc-200' : 'text-gray-800')}`}>
            {t.title}
          </h5>
          <p className={`text-md ${t.completed ? (darkMode ? 'text-zinc-500 line-through' : 'text-gray-500 line-through') : (darkMode ? 'text-zinc-300' : 'text-gray-600')}`}>
            {t.desc}
          </p>
        </div>
        <button 
          onClick={() => completeHandler(i)}
          className={`bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out`}>
          {t.completed ? 'Undo' : 'Complete'}
        </button>
        <button 
          onClick={() => deleteHandler(i)}
          className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out ml-2'>
          Delete
        </button>
      </li>
    ));

  return (
    <div className={`min-h-screen flex flex-col items-center py-10 transition-colors duration-300 ${darkMode ? 'bg-zinc-900' : 'bg-cream-100'}`}>
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className={`absolute top-5 right-5 font-bold px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out
                    ${darkMode ? 'bg-zinc-200 text-black hover:bg-zinc-300' : 'bg-zinc-800 text-white hover:bg-zinc-900'}`}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1 className={`p-6 text-5xl font-extrabold text-center rounded-xl shadow-lg ${darkMode ? 'bg-gradient-to-r from-teal-900 to-blue-800 text-white' : 'bg-gradient-to-r from-teal-400 to-blue-500 text-white'}`}>
        Abhishek's Todo List
      </h1>
      <form onSubmit={submitHandler} className={`max-w-lg w-full p-6 mt-6 rounded-lg shadow-md transition-all duration-300 ${darkMode ? 'bg-zinc-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
        <div className='flex flex-col mb-4'>
          <input 
            type="text" 
            placeholder='Enter your task' 
            className={`text-lg border-2 border-transparent rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-teal-500 ${darkMode ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-50 text-zinc-800'}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-col mb-6'>
          <input 
            type="text" 
            placeholder='Enter description here' 
            className={`text-lg border-2 border-transparent rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-teal-500 ${darkMode ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-50 text-zinc-800'}`}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button 
          type="submit"
          className='bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out w-full'>
          Add Task
        </button>
      </form>
      <hr className='my-6 w-full max-w-lg border-zinc-400'/>
      <div className={`max-w-lg w-full p-4 rounded-lg shadow-md transition-all duration-300 ${darkMode ? 'bg-zinc-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
        <ul>
          {renderTask}
        </ul>
      </div>
    </div>
  )
}

export default Page;