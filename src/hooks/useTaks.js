import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTAsk = async (newTask) => {
    const response = await fetch(`${VITE_API_URL}/tasks`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newTask),
    });
    
    const {success, message, task } = await response.json();
    
    if(!success) throw new Error(message);

    setTasks((prevTasks) => [...prevTasks, task]);
  }

  const removeTask = (taskId) => {}

  const updateTask = (updatedTask) => {}

  return { tasks, addTAsk, removeTask, updateTask };
}
