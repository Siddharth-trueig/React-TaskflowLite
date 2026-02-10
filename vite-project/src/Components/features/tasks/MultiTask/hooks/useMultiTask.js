import { useTask } from "../../../../../Common/Context/TaskContext";
import { fetchTask,updateTask,deleteTask } from "../../../../../services/TaskService";
import React, { useState } from 'react'
export const useMultiTask=()=>{
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
     
allChecks.map(async(currid)=>{
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

    return {handleChange,handleEditChange,deleteAllSelected,allChecks,deleteModal,editModal,setDeleteModal,setEditModal};
} 

