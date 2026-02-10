import React from "react";
import { TaskColumn2 } from "./TaskColumn";
import { useColumn } from "../hooks/useColumn";
export const TaskColumn=({todoStatus = [], inProgressStatus = [],doneStatus = [], loading})=>{
    const {hastask,isCollapsed,
    onDrop,allChecks,handleSave,checkBoxHandler,closeModal
    ,handleEditClick,handleDelete,handleCollapse,currRef,isModalOpen,
selectedTask,setActiveCard}=useColumn();
    return (
<TaskColumn2
hastask ={hastask} 
isCollapsed={isCollapsed}
// renderSkeletons={renderSkeletons}
onDrop={onDrop}
 allChecks={allChecks} 
handleSave={handleSave}
checkBoxHandler={checkBoxHandler}
closeModal={closeModal}
handleEditClick={handleEditClick}
handleDelete={handleDelete}
handleCollapse={handleCollapse}
currRef={currRef}
isModalOpen={isModalOpen}
selectedTask={selectedTask}
todoStatus={todoStatus}
inProgressStatus={inProgressStatus}
doneStatus={doneStatus}
loading={loading}
setActiveCard={setActiveCard}
/>
    )
}