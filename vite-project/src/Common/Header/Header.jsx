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
    <header className='app-header'>
        <span>TaskFlow Lite</span>
        <span className='app-header-right'>
            {/* //1st btn */}{
!inDashboard&&
<div>


<button onClick={handleLogin}>
Login
 </button>

  <button onClick={handleSignUp}>
SignUp
</button>
 </div>  }
{
  inDashboard&&
  <div>
    <button onClick={handleUser}>User Details</button>
    <button onClick={hadleLogout}>Logout</button>
  </div>
}


        </span>
    </header>
     <Outlet/>
     </div>
  )
}
