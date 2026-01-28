import React from 'react'
import {useAuth} from '../../Context/AuthContext'

export const Logout = () => {
    const {logout}=useAuth();
    const Logout=()=>{
logout();
navigate('/login')
console.log("Inside Logout After Clear");
  }
  return (
    <div> <button onClick={Logout}>Logout</button></div>
  )
}
