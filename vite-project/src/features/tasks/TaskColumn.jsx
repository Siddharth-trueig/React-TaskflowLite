
import React, { useState } from "react";
import { deleteTask, updateTask } from "../../services/TaskService";

export const TaskColumn = ({
  todoStatus=[],
  inProgressStatus=[],
  doneStatus=[]}) => {

  // local state for edit
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      alert("Task deleted (refresh to see changes)");
    } catch (err) {
      console.error("Delete failed");
    }
  };

  /* ================= EDIT ================= */
  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
  };

  const handleUpdate = async () => {
    try {
      await updateTask({
        ...editingTask,
        title: editTitle,
      });
      setEditingTask(null);
      alert("Task updated (refresh to see changes)");
    } catch (err) {
      console.error("Update failed");
    }
  };

  /* ================= UI ================= */
  const renderTasks = (tasks) =>
    tasks.map((task) => (
      <div
        key={task.id}
        style={{
          background: "#f4f4f44c",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <p><strong>{task.title}</strong></p>
        <p>Priority: {task.priority}</p>
        <p>Assignee: {task.assignee}</p>
       <p>Status:{task.status}</p>
       <p>Due Time:{task.dueDate}</p>
        <button onClick={() => handleEditClick(task)}>Edit</button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => handleDelete(task.id)}
        >
          Delete
        </button>
      </div>
    ));

  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <h3>To Do</h3>
          {renderTasks(todoStatus)}
        </div>

        <div>
          <h3>In Progress</h3>
          {renderTasks(inProgressStatus)}
        </div>

        <div>
          <h3>Done</h3>
          {renderTasks(doneStatus)}
        </div>
      </div>

      {/* ===== EDIT MODAL ===== */}
      {editingTask && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Task</h3>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      )}
    </>
  );
};
