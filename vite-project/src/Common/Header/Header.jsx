import React, { useEffect, useState } from 'react'
import { useModal } from '../Context/ModalContext';
import { LogoutModal } from '../Modal/LogoutModal';
import {toast} from 'react-toastify'
import { Outlet, useNavigate } from 'react-router-dom';
const offlineToastId = "offline-toast";
export const Header = () => {
  const navigate=useNavigate();
    const {loginModal,setLoginModal,signUpModal,setSignUpModal,inDashboard,setInDashboard,setLogoutModal,userDetails,setUserDetails}=useModal();


    // const showOfflineStatus=()=>{
    //   toast("You are offline!", {
    //       position: "top-right",
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //     });
    // }

    const showOfflineStatus = () => {
  toast.error("⚠️ You are offline!", {
    toastId: offlineToastId,
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    position: "top-right",
    theme: "dark",
  });
};
    useEffect(()=>{
const present=localStorage.getItem("Token");
if(present){
setInDashboard(true);
}
    },[])


    //Online Check Krne ke Liye UseEffect
//       useEffect(()=>{
       
//         if(!navigator.onLine){
//            console.log("navigator bhaiya kaam kr gye");
//           showOfflineStatus();
//         }
// else{
//   return;
// }},[]);


useEffect(() => {
  const handleOffline = () => {
    showOfflineStatus();
  };

  const handleOnline = () => {
    toast.dismiss(offlineToastId);
    toast.success("✅ Back online!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  window.addEventListener("offline", handleOffline);
  window.addEventListener("online", handleOnline);

  // initial check
  if (!navigator.onLine) {
    showOfflineStatus();
  }

  return () => {
    window.removeEventListener("offline", handleOffline);
    window.removeEventListener("online", handleOnline);
  };
}, []);


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


<button onClick={handleLogin} className='mr-4 rounded-full p-2 bg-gray-800'>
Login 
 </button>

  <button onClick={handleSignUp} className='rounded-full p-2 bg-gray-800'>
SignUp
</button>
 </div>  }
{
  inDashboard&&
  <div className='flex'>
    <button onClick={handleUser} className='rounded-md p-2 mr-4  bg-gray-800'> <span className='max-sm:hidden'>    <i class="fa-solid fa-circle-chevron-down"></i></span>User Details </button> 

    <button onClick={hadleLogout} className=' rounded-md  p-2 bg-gray-800'><span className='max-sm:hidden '><i class="fa-solid fa-circle-chevron-left"></i></span> Logout </button>
  </div>
}


        </span>
    </header>
     <Outlet/>
     </div>
  )
}
