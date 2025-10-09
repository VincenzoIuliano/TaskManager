import { useState, useRef, useMemo, useContext } from "react";
import {GlobalContext} from "../context/GlobalContext";

export const symbols = `!@#$%^&*()-+=[]{};:'"\\|,<.>/?\`~§±€£¢¥•√÷×¶∆`;

export default function AddTask() {

  const {addTAsk} = useContext(GlobalContext);
  const [taskTitle, setTaskTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(taskNameError) return;
    const newTask = {
      title: taskTitle,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
      createdAt: new Date().toLocaleDateString(),
    };
    
    try {
      await addTAsk(newTask);
      alert("Task aggiunta con successo!");
      setTaskTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "todo";
    }catch (error) {
      console.error("Error adding task:", error);
      alert("Errore durante l'aggiunta della task: " + error.message);
    }
}

  const taskNameError = useMemo(() => {
    if(!taskTitle.trim()) return "Il nome della task è obbligatorio";
    if(taskTitle.length < 3) return "Il nome della task deve essere lungo almeno 3 caratteri";
    if(taskTitle.length > 50) return "Il nome della task deve essere lungo massimo 50 caratteri";
    if([...taskTitle].some(char => symbols.includes(char))) return "Il nome della task non può contenere caratteri speciali";
    return null;
  }, [taskTitle]);

  return (
    <div className="AddTask">
      <h1>Aggiungi la tua prossima task!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome task:
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </label>
        {taskNameError && <p className="error" style={{color: 'red'}}>{taskNameError}</p>}
        <label>
          Descrizione:
          <input type="textarea" ref={descriptionRef} />
        </label>
        <label>
          Stato:
          <select ref={statusRef} defaultValue="todo">
            <option value="To do">To Do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </label>

        <button type="submit" disabled={taskNameError}>Aggiungi Task</button>

      </form>
    </div>
  );
}
