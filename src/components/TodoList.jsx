import { useState, useEffect } from 'react'
import { CiCircleCheck } from "react-icons/ci";
import appImage from '../../public/sticky-note.png'; 

const TodoList = () => {
const [tasks, setTasks] = useState(getAllTasks) //array to store the list of tasks.
const [newTask, setNewTask] = useState("") //string to store the content of the new task input field.

const addTask =  () => { // adding a new task to the tasks array.
    if (newTask.trim() !== ""){ //checks if the newTask string is not empty or only whitespace.
        console.log(newTask)
        setTasks([...tasks, newTask])
        setNewTask("") //empty input
    }
}
const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  }

const deleteTask = (index) => { // deletes a task from the tasks array based on its index.
    const updateTasks = [...tasks];
    console.log(updateTasks)
    updateTasks.splice(index, 1)
    setTasks(updateTasks)
}

 //Add to localStorage 
 useEffect(()=>{ //runs whenever the tasks state changes.
    localStorage.setItem("allTasks", JSON.stringify(tasks)); //key-allTasks
  }, [tasks])
 //Take from localStorage 
  function getAllTasks() {
    const data = JSON.parse(localStorage.getItem("allTasks")) || []; //If there are no tasks in localStorage (or if the key doesn't exist), it returns an empty array [].
    if (data.length === 0) localStorage.setItem("allTasks", "[]"); //if data is an empty array -> initializes the "allTasks" key in localStorage with an empty array
    return data;
}
  
return (
<div className="min-h-screen flex flex-col items-center mb-10 mt-20">
  <img className='max-w-[180px]' src={appImage} alt="logo" />
  
  <div className="md:min-w-[500px] sm:min-w-[350px]">
    <h1 className="text-3xl font-bold my-5">List</h1>

    <div className="flex flex-col md:flex-row gap-3 items-center">
      <input 
        type="text" 
        value={newTask} 
        onChange={(e)=> setNewTask(e.target.value)} 
        onKeyPress={handleKeyPress} 
        placeholder="Add a new task" 
        className="border border-gray-300 rounded-md text-[#4c4c70] px-4 py-3 flex-grow sm:min-w-[400px]"
      />
      <button 
        onClick={addTask} 
        className="bg-[#9d9dd7] text-white hover:bg-[#9292db] duration-300 hover:scale-110 rounded-md px-4 py-3 max-w-[100px]"
            >Add Task
      </button>
    </div>

        <ul className="my-7 text-justify  max-h-[300px] overflow-scroll">
          {tasks.map((task, index)=> ( // iterates over the tasks array, generating a list item (<li>) for each task.
            <li key={index} className=" flex justify-between items-center border-b border-gray-300 py-4 px-2 text-[#8c469b]">
              <span>{task}</span>
                <button 
                    onClick={()=> {
                    deleteTask(index)
                    }} 
                    className="text-[#833ea6] text-3xl duration-300 hover:scale-125 hover:text-[green] mx-3 "
                ><CiCircleCheck />
                </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default TodoList