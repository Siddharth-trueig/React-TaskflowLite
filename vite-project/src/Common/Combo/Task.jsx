import React from 'react'
import { TaskSearch } from '../../Components/features/tasks/TaskSearch'
import { FilterPanel } from '../../Components/features/tasks/FilterPanel'
import { TaskBoard } from '../../Components/features/tasks/TaskBoard'
import { TaskRender } from '../../Components/features/tasks/TaskRender'
export const Task = () => {
  return (
    <div className='flex h-[100vh] flex-col justify-center items-center bg-[#200B33] text-white'>
 <TaskSearch/>        
  <FilterPanel/>
  <TaskBoard />
  <TaskRender/>
    </div>
  )
}
