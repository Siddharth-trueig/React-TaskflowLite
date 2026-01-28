
import React, { useState } from "react";
import { deleteTask, updateTask } from "../../services/TaskService";
import { EditTaskModal } from "./EditTaskModal";
import {useTask} from '../../Context/TaskContext'
import { DropArea } from "./DropArea";
export const TaskColumn = ({
  todoStatus=[],
  inProgressStatus=[],
  doneStatus=[]}) => {

const{Ctasks,setCtasks,activeCard,setActiveCard}=useTask();

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

const onDrop=async(status,position)=>{
  console.log(`${activeCard} is going to place into ${status} and at the position ${position} `)
  if(activeCard==null || activeCard===undefined) return;
  const taskToMove=Ctasks.find((task)=>task.id==activeCard);

   const updatedTask = {
    ...taskToMove,
    status,
  };


  const remaining=Ctasks.filter((task)=> task.id!== activeCard);

const updatedTasks = [...remaining];
  updatedTasks.splice(position, 0, updatedTask);
setCtasks(updatedTasks);
  //Backend Logic

try{
  await updateTask({
    id:activeCard,
    status

  //    id: taskToMove.id,
  // title: taskToMove.title,
  // priority: taskToMove.priority,
  // status,
  // dueDate: taskToMove.dueDate,
  // assignee: taskToMove.assignee,
  });
}
catch(error){
console.log("Error occured in update in backend",error);
}
setActiveCard(null);
  // console.log("remainig value",remaining);
  
  // console.log("Task to move Data is",taskToMove);
}
  /* ================= UI ================= */
  const renderTasks = (tasks,onDrop) =>{
         if (tasks.length === 0) {
    return (
      <DropArea onDrop={() => onDrop(0)} />
    );
  }
   return tasks.map((task,index) => (
       <React.Fragment key={task.id}>
     
{<DropArea onDrop={()=>onDrop(index)} />}
     
      <div
        key={task.id}
        style={{
          background: "#f4f4f44c",
          padding: "10px",
          marginBottom: "10px",
          cursor:"grab"
        }}
        draggable onDragStart={()=>setActiveCard(task.id)}
        onDragEnd={()=>setActiveCard(null)}
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
       {<DropArea onDrop={()=>onDrop(index+1)}/>}
       </React.Fragment>
    ));
  }
  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <h3>To Do</h3>
          {renderTasks(todoStatus,(position)=>onDrop("todo",position))}
          {/* <div>activeCard-{activeCard}</div> */}
        </div>

        <div>
          <h3>In Progress</h3>
          {renderTasks(inProgressStatus,(position)=>onDrop("in-progress",position))}
            {/* <div>activeCard-{activeCard}</div> */}
        </div>

        <div>
          <h3>Done</h3>
          {renderTasks(doneStatus,(position)=>onDrop("done",position))}
            {/* <div>activeCard-{activeCard}</div> */}
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
