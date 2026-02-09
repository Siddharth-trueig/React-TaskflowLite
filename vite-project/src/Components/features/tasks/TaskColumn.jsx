
import React, { useEffect, useRef, useState } from "react";
import { deleteTask, updateTask } from "../../../services/TaskService";
import { EditTaskModal } from "./EditTaskModal";
import {useTask} from '../../../Common/Context/TaskContext'
import { DropArea } from "./DropArea";
import {toast} from 'react-toastify'
import {retryToast} from '../../../Common/Toast/Toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export const TaskColumn = ({
  todoStatus=[],
  inProgressStatus=[],
  doneStatus=[],
  loading
}) => {

const{Ctasks,setCtasks,activeCard,setActiveCard,allChecks,setAllChecks}=useTask();

const showBasicToast=(id)=>{
  toast("🦄 Undo Delete!", {
      position: "top-right",
      autoClose: 4500,
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


  const deleteTaskLogic = async (id) => {
  await deleteTask(id);
  setCtasks((prev) => prev.filter((task) => task.id !== id));
};
  /* ================= DELETE ================= */
  const handleDelete =  (id) => {
    // setPendingDelete(id);
 

   if(currRef.current[id]){
currRef.current[id].style.display="none";
   }
   showBasicToast(id);
    timerRef.current[id]=setTimeout( async()=>{
 try {
  console.log("Inside Try Block");
     const result= await deleteTaskLogic(id);
      // console.log(Ctasks.length)
      // const remaining=Ctasks.filter((task)=>task.id!==id);
      // setCtasks(remaining);
      
      delete timerRef.current[id];
      delete currRef.current[id];   
    } 

    catch (error) {
if(currRef.current[id]){
currRef.current[id].style.display="block";
   }
 console.error("Delete failed");
 retryToast({message:"Error Occured While Deleting task", retry:()=>deleteTaskLogic(id)})
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

const editSave=async({id,updatedData})=>{
 const updatedTask= await updateTask({
      id:id,
      ...updatedData,
    });

     

  setCtasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {id,...updatedData} //  merge
          : task
      )
    );
      closeModal();
}

const handleSave = async(updatedData) => {
  const {id}=selectedTask
  try {
    await editSave({id,updatedData})
 
}
catch (err) {
    console.error("Update failed");
     retryToast({message:"Error Occured While Updating task", retry:()=>editSave({id,updatedData})})
  };
}

 const taskToMove= ()=>{
  if(allChecks.length>0){
return Ctasks.filter((task)=>allChecks.includes(String(task.id)));
  }
else{
  // return Ctasks.find((task)=>task.id==activeCard);// isme error aayega 
   const singleTask = Ctasks.find(
      task => task.id == activeCard
    );
    return singleTask ? [singleTask] : [];
}
 }


const onDrop=async(status,position)=>{
  console.log(`${activeCard} is going to place into ${status} and at the position ${position} `)
  if(activeCard==null || activeCard===undefined) return;

  const tasks=taskToMove();
 
const updateSelectedTask=tasks.map((task)=>({
  ...task,status
}))
console.log("UpdateSelectedTask",updateSelectedTask);

// const removeSelected=Ctasks.filter((task)=>tasks.filter((tascurr)=>tascurr.id!==task.id))
const removeSelected=Ctasks.filter((task)=>!tasks.some((t)=>t.id===task.id))

console.log("Remove Selected",removeSelected)
// const updatedTask = {
//     ...taskToMove,
//     status,
//   };

  //const remaining=Ctasks.filter((task)=> task.id!== activeCard);

const updatedTasks = [...removeSelected];
  updatedTasks.splice(position, 0, ...updateSelectedTask);
setCtasks(updatedTasks);
  //Backend Logic

try{
  for(const task of updateSelectedTask){
 await updateTask({
    id:task.id,
    status

  //    id: taskToMove.id,
  // title: taskToMove.title,
  // priority: taskToMove.priority,
  // status,
  // dueDate: taskToMove.dueDate,
  // assignee: taskToMove.assignee,
  });
  }
 
}
catch(error){
console.log("Error occured in update in backend",error);
}
setActiveCard(null);
setAllChecks([]);

  // console.log("remainig value",remaining);
  
  // console.log("Task to move Data is",taskToMove);
}
  /* ================= UI ================= */

 const renderSkeletons = (count = 3) => {
    return Array(count).fill(0).map((_, i) => (
      <div key={i} className=" p-4 w-60 h-40 border mt-10 border-input-bg rounded-md mb-4">
        <Skeleton height={20} width="80%" style={{ marginBottom: '10px' }} />
        <Skeleton count={3} height={15} style={{ marginBottom: '5px' }} />
        <div className="flex gap-2 mt-4">
          <Skeleton width={50} height={25} />
          <Skeleton width={50} height={25} />
        </div>
      </div>
    ));
  };

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
        <span><strong>{task.title}  </strong></span>
        <span>
        <input type="checkbox" 
        checked={allChecks.includes(String(task.id))}
        value={task.id } onChange={checkBoxHandler} />
         </span>
        </div>
        <p>Priority: {task.priority } </p>
        <p>Assignee: {task.assignee }  </p>
       <p>Status:{task.status }  </p>
       <p>Due Time:{task.dueDate }  </p>
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
          {loading?renderSkeletons(2):renderTasks(todoStatus,(position)=>onDrop("todo",position))}
          {/* <div>activeCard-{activeCard}</div> */}
        </div>

        <div className="h-[25vh] overflow-y-auto md:h-[80vh]">
          <h3>In Progress</h3>
          {loading?renderSkeletons(2):renderTasks(inProgressStatus,(position)=>onDrop("in-progress",position))}
            {/* <div>activeCard-{activeCard}</div> */}
        </div>

        <div className="h-[25vh] overflow-y-auto md:h-[80vh]">
          <h3>Done</h3>
          {loading?renderSkeletons(2):renderTasks(doneStatus,(position)=>onDrop("done",position))}
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
