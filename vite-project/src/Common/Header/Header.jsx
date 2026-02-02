import React, { useState } from 'react'
import { useModal } from '../Context/ModalContext';
import { LogoutModal } from '../Modal/LogoutModal';
export const Header = () => {
    const {loginModal,setLoginModal,signUpModal,setSignUpModal,inDashboard,setLogoutModal,userDetails,setUserDetails}=useModal();
      function handleLogin(){
setLoginModal(true);
      }
      function handleSignUp(){
        setSignUpModal(true);
      }
function hadleLogout(){
  setLogoutModal(true);
}
function handleUser(){
setUserDetails(true);
}
      
  return (
    <div className='bg-red-500'>
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
     </div>
  )
}
