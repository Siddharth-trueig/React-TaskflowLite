import React from 'react'
import { TaskSearch } from '../../Components/features/tasks/TaskSearch'
import { FilterPanel } from '../../Components/features/tasks/FilterPanel'
import { TaskBoard } from '../../Components/features/tasks/TaskBoard'
import { TaskRender } from '../../Components/features/tasks/TaskRender'
export const Task = () => {
  return (
    <div className='flex min-h-[700px] scroll-auto flex-col mt-16 justify-center items-center bg-[#200B33] text-white'>
 <TaskSearch/>        
  <FilterPanel/>
  <TaskBoard />
  <TaskRender/>
    </div>
  )
}
