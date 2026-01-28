import React, { useState } from 'react'

export const TaskSearch = () => {
    const[search,setSearch]=useState('')
  return (
    <div>
  <div>Search By Title:</div>
 <input className="search" type="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
    </div>
  )
}
