import React, { useState } from 'react'
import { useTask } from '../../../Common/Context/TaskContext'

import './EditModal.css'
import { deleteTask, fetchTask, updateTask } from '../../../services/TaskService';
export const MultiTask = () => {
    const{allChecks,setAllChecks,Ctasks,setCtasks}=useTask();
    const[deleteModal,setDeleteModal]=useState(false);
    const[editModal,setEditModal]=useState(false);
    

    function handleChange(event){
if(event.target.value=="Delete"){
  setDeleteModal(true);
}
else if(event.target.value=="Edit"){
   setEditModal(true);
}
else{
    return;
}
    }

   async function handleEditChange(event){
const currpriority=event.target.value;
if(!currpriority)return;

allChecks.map( async(currid)=>{
    try{
  await updateTask({id: currid,
  priority: currpriority});
  setEditModal(false);
   const newCtask=await fetchTask();
 setCtasks(newCtask);
 setAllChecks([]);
}

  catch(error){
    console.log("error Occured While Updating to  Task",error);
  }

}

)

    }

//delete All Task Ho rhe hai 
    function deleteAllSelected(){
        let newCtask=Ctasks;
     
allChecks.map( async(currid)=>{
    try{
  await deleteTask(currid);

   newCtask=newCtask.filter((task)=>{
    return task.id!=currid
})
setCtasks(newCtask);
setAllChecks([]);
    }
  catch(error){
    console.log("error Occured While trying to delete Task",error);
  }

})
setDeleteModal(false);
    }


  return (
    <div>
    {
        allChecks.length > 0 &&
         <div>MultiTask
        <select onChange={handleChange}>Select Change 
            <option>Select</option>
            <option value="Delete">Delete</option>
             <option value="Edit">Edit</option>
        </select>
    </div>
    }
    {
        deleteModal&&
        <div className='modal-backdrop'>

        <div className='flex flex-col modal'>
            <p>Are You Confirm Want to delete Selected Task?...</p>
            <div className='Flex justify-around '>
                <button className='saveBtn' onClick={deleteAllSelected}>Yes</button>
            <button className='saveBtn' onClick={()=>setDeleteModal(false)}>No</button>
                </div>
            
            </div>
            </div>
    }

    {
        editModal&&
           <div className='modal-backdrop'>

        <div className='flex flex-col modal'>
          <select onChange={handleEditChange}>
            <option >Choose Priority</option>
              <option value="low">Low</option>
                <option value="medium">Medium</option>
                  <option value="high">High</option>
          </select>
          <button className='bg-saveBtn ' onClick={()=>setEditModal(false)}>Cancel</button>
                </div>
            
            </div>
        
    }
   </div>
  )
}
