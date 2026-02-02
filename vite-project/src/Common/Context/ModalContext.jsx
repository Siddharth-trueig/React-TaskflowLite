import { createContext, useContext, useState } from "react";

const modalContext = createContext();

export const ModalProvider=({children})=>{
const[loginModal,setLoginModal]=useState(false);
const[signUpModal,setSignUpModal]=useState(false);
const[inDashboard,setInDashboard]=useState(false);
const[logoutModal,setLogoutModal]=useState(false);
const[userDetails,setUserDetails]=useState(false);
      return (
    <modalContext.Provider value={{ loginModal,setLoginModal,signUpModal,setSignUpModal,inDashboard,setInDashboard,logoutModal,setLogoutModal,userDetails,setUserDetails}}>
      {children}
    </modalContext.Provider>
  );
}

  export const useModal=()=>useContext(modalContext);