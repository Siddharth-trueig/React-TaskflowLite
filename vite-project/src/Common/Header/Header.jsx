import React, { useEffect, useState } from 'react'
import { useModal } from '../Context/ModalContext';
import { LogoutModal } from '../Modal/LogoutModal';
import { Outlet, useNavigate } from 'react-router-dom';
export const Header = () => {
  const navigate=useNavigate();
    const {loginModal,setLoginModal,signUpModal,setSignUpModal,inDashboard,setInDashboard,setLogoutModal,userDetails,setUserDetails}=useModal();

    useEffect(()=>{
const present=localStorage.getItem("Token");
if(present){
setInDashboard(true);
}
    },[])
      function handleLogin(){
        navigate("/login");
setLoginModal(true);
      }
      function handleSignUp(){
         navigate("/login");
        setSignUpModal(true);
      }
function hadleLogout(){
  setLogoutModal(true);
}
function handleUser(){
  console.log("Setting User Details");
setUserDetails(true);
}
      
  return (
    <div className=''>
    <header className='app-header text-white bg-gray-900'>
        <span>TaskFlow Lite</span>
        <span className='app-header-right'>
            {/* //1st btn */}{
!inDashboard&&
<div>


<button onClick={handleLogin} className='mr-4 bg-gray-800'>
Login 
 </button>

  <button onClick={handleSignUp} className='bg-gray-800'>
SignUp
</button>
 </div>  }
{
  inDashboard&&
  <div >
    <button onClick={handleUser} className='mr-4 bg-gray-800'>User Details <i class="fa-solid fa-circle-chevron-down"></i></button>
    <button onClick={hadleLogout} className='bg-gray-800'> <i class="fa-solid fa-circle-chevron-left"></i>Logout </button>
  </div>
}


        </span>
    </header>
     <Outlet/>
     </div>
  )
}
