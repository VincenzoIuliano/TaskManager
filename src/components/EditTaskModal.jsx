import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task || {});
  const editFormRef = useRef();

  // 🔁 Aggiorna lo stato se la task cambia (es. aprendo modali diverse)
  useEffect(() => {
    setEditedTask(task || {});
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  const changeEditedTask = (key, event) => {
    const value = event.target.value;
    setEditedTask((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!editedTask) return null;

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <label>
            Nome task:
            <input
              type="text"
              value={editedTask.title || ""}
              onChange={(e) => changeEditedTask("title", e)}
            />
          </label>

          <label>
            Descrizione:
            <textarea
              value={editedTask.description || ""}
              onChange={(e) => changeEditedTask("description", e)}
            />
          </label>

          <label>
            Stato:
            <select
              value={editedTask.status || "To do"}
              onChange={(e) => changeEditedTask("status", e)}
            >
              {["To do", "Doing", "Done"].map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </label>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
    />
  );
}
