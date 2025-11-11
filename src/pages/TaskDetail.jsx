import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);

  const task = tasks.find((t) => t.id === parseInt(id));

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  if (!task) {
    return <h1 className="TaskDetails-empty">Task non trovata</h1>;
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Errore durante l'eliminazione della task: " + error.message);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      alert("Task aggiornata con successo!");
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Errore durante l'aggiornamento della task: " + error.message);
    }
  };
  return (
    <>
      <div className="TaskDetails">
        <h1>{task.title}</h1>
        <p>
          <strong>Descrizione:</strong> {task.description}
        </p>
        <p>
          <strong>Stato:</strong>
          <span className={`status-${task.status.replace(/\s/g, "")}`}>
            {task.status}
          </span>
        </p>
        <p>
          <strong>Data di creazione:</strong>{" "}
          {new Date(task.createdAt).toLocaleDateString()}
        </p>

        <button onClick={() => setShowDeleteModal(true)}>Elimina task</button>
        <button onClick={() => setShowEditModal(true)}>Modifica task</button>

        {/* Modale di conferma eliminazione */}
        <Modal
          title="Conferma eliminazione"
          content={<p>Sei sicuro di voler eliminare la task "{task.title}"?</p>}
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          confirmText="Elimina"
        />
      </div>

      {/* Modale di modifica task */}
      <EditTaskModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
        onSave={handleUpdate}
      />
    </>
  );
}
