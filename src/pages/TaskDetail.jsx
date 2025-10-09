import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask } = useContext(GlobalContext);

  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) {
    return <h1 className="TaskDetails-empty">Task non trovata</h1>;
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Errore durante l'eliminazione della task: " + error.message);
    }
  }

  return (
    <div className="TaskDetails">
      <h1>{task.title}</h1>
      <p><strong>Descrizione:</strong> {task.description}</p>
      <p>
        <strong>Stato:</strong>
        <span className={`status-${task.status.replace(/\s/g, '')}`}>
          {task.status}
        </span>
      </p>
      <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>

      <button onClick={handleDelete}>Elimina task</button>
    </div>
  );
}
