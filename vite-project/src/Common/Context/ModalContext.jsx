import { createContext, useContext, useState } from "react";

const modalContext = createContext();

export const ModalProvider=({children})=>{
const[loginModal,setLoginModal]=useState(false);
const[signUpModal,setSignUpModal]=useState(false);

      return (
    <modalContext.Provider value={{ loginModal,setLoginModal,signUpModal,setSignUpModal }}>
      {children}
    </modalContext.Provider>
  );
}

  export const useModal=()=>useContext(modalContext);