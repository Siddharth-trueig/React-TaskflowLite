import React from 'react'
import { useEditTaskModal } from '../hooks/useEditTaskModal'
import { EditTaskModal2 } from './EditTaskModal'
export const EditTaskModal = ({task,onClose,onSave}) => {
    const {formData,handleChange,handleSubmit}=useEditTaskModal(task,onSave);
      return (
   <EditTaskModal2
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onClose={onClose}
   />
  )
}
