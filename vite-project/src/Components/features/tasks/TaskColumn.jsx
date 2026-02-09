
import React, { useEffect, useRef, useState } from "react";
import { deleteTask, updateTask } from "../../../services/TaskService";
import { EditTaskModal } from "./EditTaskModal";
import {useTask} from '../../../Common/Context/TaskContext'
import { DropArea } from "./DropArea";
import {toast} from 'react-toastify'

export const TaskColumn = ({
  todoStatus=[],
  inProgressStatus=[],
  doneStatus=[]}) => {

const{Ctasks,setCtasks,activeCard,setActiveCard,allChecks,setAllChecks}=useTask();


const showBasicToast=(id)=>{
  toast("🦄 Undo Delete!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClick:()=>{
       handleUndo(id)
      }
    });
}

const timerRef=useRef({});
const currRef=useRef({});
  // local state for edit
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  /* ================= DELETE ================= */
  const handleDelete =  (id) => {
    // setPendingDelete(id);
   showBasicToast(id);

   if(currRef.current[id]){
currRef.current[id].style.display="none";
   }
   
    timerRef.current[id]=setTimeout( async()=>{
 try {
  console.log("Inside Try Block");
      await deleteTask(id);
      // console.log(Ctasks.length)
      const remaining=Ctasks.filter((task)=>task.id!==id);
      setCtasks(remaining);
      delete timerRef.current[id];
      delete currRef.current[id];
    
    } catch (err) {
       if(currRef.current[id]){
currRef.current[id].style.display="block";
   }
      console.error("Delete failed");
    }

    },4000);
   
  };


  const handleUndo=(id)=>{
  
    console.log("Inside Handle Undo ",currRef);

    if(timerRef.current[id]){
clearTimeout(timerRef.current[id]);
delete timerRef.current[id];
    }


 if(currRef.current[id]){
currRef.current[id].style.display="block";
   }

  }

//checkbox ko uncheck krne ke liye on reload 



  //isko banaya hai memory leaks bachane ke liye
  useEffect(()=>{
    

    console.log("Inside USeEffect ",timerRef)
 return () => {
    Object.values(timerRef.current).forEach((timerId) => clearTimeout(timerId));
  };
  },[])

  /* ================= EDIT ================= */
  const handleEditClick = (task) => {
   setSelectedTask(task);
  setIsModalOpen(true);
  };



  const closeModal = () => {
  setIsModalOpen(false);
  setSelectedTask(null);
};


  //  const handleCheck=(id)=>{
  //   setAllChecks(prev=>[...prev,id]);
  //  }

   function checkBoxHandler(e){
let isChecked=e.target.checked;
let id=e.target.value;
console.log("value of allchecks ",allChecks);
if(isChecked){
  setAllChecks([...allChecks,id])
}
else{
  setAllChecks((prevData)=>{
    return prevData.filter((taskid)=>{
     return taskid!==id;
    })
})
}
   }
const handleSave = async(updatedData) => {

  const {id}=selectedTask

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
// if (!selectedTask?.id) return;
// console.log("selected task id",selectedTask.id,"updatedData",updatedData);

//  dispatch(updateTodo({id:selectedTask.id,updatedData}));
    closeModal();
  
}
catch (err) {
    console.error("Update failed");
  };
}

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
        ref={(el)=>currRef.current[task.id]=el}
       className="bg-gray-900/50 p-4 max-w-60 max-h-60 overflow-x-auto overflow-y-hidden border border-input-bg hover:border-blue-700 cursor-grab rounded-md"
        draggable onDragStart={()=>setActiveCard(task.id)}
        onDragEnd={()=>setActiveCard(null)}
      >
        <div className="flex justify-between">
        <span><strong>{task.title}</strong></span>
        <span>
        <input type="checkbox" 
        checked={allChecks.includes(String(task.id))}
        value={task.id} onChange={checkBoxHandler} />
         </span>
        </div>
        <p>Priority: {task.priority}</p>
        <p>Assignee: {task.assignee}</p>
       <p>Status:{task.status}</p>
       <p>Due Time:{task.dueDate}</p>
        <button onClick={() => handleEditClick(task)}>Edit</button>
     <button
          style={{ marginLeft: "10px" }}
          onClick={()=>handleDelete(task.id)}
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
      <div className="flex md:flex-row justify-center items-center flex-col gap-x-10 gap-y-6 w-screen  md:gap-x-20">
        <div className="h-[25vh] overflow-y-auto md:h-[80vh]">
          <h3>To Do</h3>
          {renderTasks(todoStatus,(position)=>onDrop("todo",position))}
          {/* <div>activeCard-{activeCard}</div> */}
        </div>

        <div className="h-[25vh] overflow-y-auto md:h-[80vh]">
          <h3>In Progress</h3>
          {renderTasks(inProgressStatus,(position)=>onDrop("in-progress",position))}
            {/* <div>activeCard-{activeCard}</div> */}
        </div>

        <div className="h-[25vh] overflow-y-auto md:h-[80vh]">
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
