// import React from 'react'
// import { useSearch } from './useSearch';
// import {useEffect,useState} from 'react'

// export const UseDebounce = ({search,Delay=300}) => {
//     const [debouncedValue, setDebouncedValue] = useState(search);
//   useEffect(() => {
//     // Set a timeout to update the debounced value after the specified delay
//     const handler = setTimeout(() => {
//       setDebouncedValue(search);
//     }, Delay);

//     // Cleanup function: this runs if the value changes again before the timeout
//     // fires, resetting the timer and preventing the old value from being used
//     console.log("Inside the debounce",debouncedValue);
//      <useSearch debouncedValue={debouncedValue}/>
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [search, Delay]);
// }

import { useEffect, useState } from "react";

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

