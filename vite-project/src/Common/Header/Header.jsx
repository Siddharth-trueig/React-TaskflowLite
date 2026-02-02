import React, { useState } from 'react'
import { useModal } from '../Context/ModalContext';
export const Header = () => {
    const {loginModal,setLoginModal,signUpModal,setSignUpModal}=useModal();
      function handleLogin(){
setLoginModal(true);
      }
      function handleSignUp(){
        setSignUpModal(true);
      }

      
  return (
    <div className='bg-red-500'>
    <header className='app-header'>
        <span>TaskFlow Lite</span>
        <span className='app-header-right'>
            {/* //1st btn */}
            <button onClick={handleLogin}>
Login
            </button>

            <button onClick={handleSignUp}>
SignUp
            </button>
        </span>
    </header>
     </div>
  )
}
