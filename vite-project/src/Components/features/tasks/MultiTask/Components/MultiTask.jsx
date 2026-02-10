import '../../EditModal/Components/EditModal.css'
export const MultiTask2 = ({handleChange,handleEditChange,deleteAllSelected,allChecks,deleteModal,editModal,setDeleteModal,setEditModal}) => {
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
            <p>Are You Sure You Want to delete Selected Task?...</p>
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
