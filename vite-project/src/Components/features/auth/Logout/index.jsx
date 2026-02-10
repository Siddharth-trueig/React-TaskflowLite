import React from 'react'
import { useAuth } from '../../../../Common/Context/AuthContext';
import { redirect } from 'react-router-dom';
export const Logout = () => {
    const {logout}=useAuth();
    const Logout=()=>{
logout();
// navigate('/login')
redirect('/login')
console.log("Inside Logout After Clear");
  }
  return (
    <div> <button onClick={Logout}>Logout</button></div>
  )
}
