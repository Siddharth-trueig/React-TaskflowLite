  import React from 'react'
  import { TaskSearch } from '../../Components/features/tasks/TaskSearch'
  import { FilterPanel } from '../../Components/features/tasks/FilterPanel'
  import { TaskBoard } from '../../Components/features/tasks/TaskBoard'
  import { TaskRender } from '../../Components/features/tasks/TaskRender'
  import { MultiTask } from '../../Components/features/tasks/MultiTask'
  import { SkeletonTheme } from 'react-loading-skeleton';

  export const Task = () => {
    return (
      <div className='flex flex-col scroll-auto w-screen h-[94vh] mt-16 justify-center items-center bg-[#200B33] text-white'>
        <div className='flex gap-x-4 sm:mt-4 mt-10'>
        <div>
  <TaskSearch/>     
        </div>
    <div className='mt-2'>
  <FilterPanel/>
    </div>
    <div className='mt-6'>
      <SkeletonTheme baseColor="#1f2937" highlightColor="#374151">
    <TaskBoard />
  </SkeletonTheme>
    
    </div>
  <div>
    <MultiTask/>
  </div>
        </div>

  <div className='flex justify-center items-center mt-10'>
  <TaskRender/>
  </div>
  
      </div>
    )
  }
