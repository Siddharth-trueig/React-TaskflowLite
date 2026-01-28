// import React, { useEffect, useState } from 'react'
// import {UseDebounce} from '../../hooks/useDebounce'


// export const TaskSearch = () => {
//     const[search,setSearch]=useState('');
// // const search=document.querySelector(".search");
// useEffect(()=>{
//     console.log("searh",search);
// <UseDebounce search={search}/>
// },[search]);

//   return (
//     <div>
//   <div>Search By Title:</div>
//  <input className="search" type="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
 
//     </div>

//   )
// }
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useTask } from "../../Context/TaskContext";

export const TaskSearch = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { setSearchval } = useTask();

  useEffect(() => {
    setSearchval(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div>
      <div>Search By Title:</div>
      <input
        className="search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

