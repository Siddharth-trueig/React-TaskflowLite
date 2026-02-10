import React from 'react'
import '../../EditModal/Components/EditModal.css'
import { MultiTask2 } from './MultiTask'
import { useMultiTask } from '../hooks/useMultiTask'
export const MultiTask = () => {
    const {handleChange,handleEditChange,deleteAllSelected,allChecks,deleteModal,editModal,setDeleteModal,setEditModal}=useMultiTask();
  return (
    <div>
        <MultiTask2
       handleChange={handleChange}
       handleEditChange={handleEditChange}
       deleteAllSelected={deleteAllSelected}
       allChecks={allChecks}
       deleteModal={deleteModal}
       editModal={editModal}
       setDeleteModal={setDeleteModal}
       setEditModal={setEditModal}
        />
    </div>
  )
}
