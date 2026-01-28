
import React, { useState } from "react";
import { deleteTask, updateTask } from "../../services/TaskService";
import { EditTaskModal } from "./EditTaskModal";
import {useTask} from '../../Context/TaskContext'
export const TaskColumn = ({
  todoStatus=[],
  inProgressStatus=[],
  doneStatus=[]}) => {

const{Ctasks,setCtasks}=useTask();

  // local state for edit
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      // console.log(Ctasks.length)
      const remaining=Ctasks.filter((task)=>task.id!==id);
      setCtasks(remaining);
      // console.log(Ctasks.length)
      // alert("Task deleted (refresh to see changes)");
    } catch (err) {
      console.error("Delete failed");
    }
  };

  /* ================= EDIT ================= */
  const handleEditClick = (task) => {
   setSelectedTask(task);
  setIsModalOpen(true);
  };


//     try {
//       await updateTask({
//         ...editingTask,
//         title: editTitle,
//       });
//       setEditingTask(null);
//       alert("Task updated (refresh to see changes)");
//     } catch (err) {
//       console.error("Update failed");
//     }
//   };

  const closeModal = () => {
  setIsModalOpen(false);
  setSelectedTask(null);
};

const handleSave = async (updatedData) => {
  // console.log(selectedTask);
  const {id}=selectedTask
  // console.log("upadted data",updatedData);
setCtasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id
          ? {id,...updatedData} //  merge
          : task
      )
    );
  try {
   const updatedTask= await updateTask({
      id: selectedTask.id,
      ...updatedData,
    });
    // const remain= Ctasks.filter((task)=>task.id!==selectedTask.id);
    // setCtasks(...remain,selectedTask.id,...updatedData)
//  setCtasks((prev) =>
//       prev.map((task) =>
//         task.id === selectedTask.id ? updatedTask : task
//       )
//     );
 
    closeModal();
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
      {isModalOpen && (
        <EditTaskModal
    task={selectedTask}
    onClose={closeModal}
    onSave={handleSave}
  />
      )}
    </>
  );
};
