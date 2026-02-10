import React from 'react'
import { useBoard } from '../hooks/useBoard'
import { TaskBoard2 } from './taskBoard'
export const TaskBoard= () => {
    const {createTask, loading, error,showModal, setShowModal,isAdded, setIsAdded, Ctasks, setCtasks,formData, setFormData,handleChange,handleSubmit}=useBoard(
    );
  return (
    <div>
<TaskBoard2
createTask={createTask}
loading={loading}
error={error}
showModal={showModal}
setShowModal={setShowModal}
isAdded={isAdded}
setIsAdded={setIsAdded}
Ctasks={Ctasks}
setCtasks={setCtasks}
formData={formData}
setFormData={setFormData}
handleChange={handleChange}
handleSubmit={handleSubmit}
/> 
    </div>
  )
}
