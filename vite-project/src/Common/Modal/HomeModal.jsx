// import React from 'react'
// import img from '../../assets/img.png'
// import { useModal } from '../Context/ModalContext'
// // import { Input } from '../Form/Input';
// import Login from '../../Components/features/auth/Login';
// import SignUp from '../../Components/features/auth/Signup';
// export const HomeModal = () => {
//     const {loginModal,signUpModal,setLoginModal, setSignUpModal}=useModal();
//     if (!loginModal && !signUpModal) return null;
//   return (
//     <div className='fixed w-[50vw] inset-0 z-50 bg-black/50 flex items-center justify-center '>
// {/* leftPart */}
// {/* flex w-[50vw] justify-center items-center gap-[4vw] border border-[var(--main-border)] border-[var(--main-border-color)]  */}
// <span >
//     <img src={img} 
//  />
// </span>

// {/* RightPart  */}
// <span>

//     {/* first div  */}
// <span className='flex flex-col'>
// {loginModal&&<Login/>
// }

// </span>
//    {/* second div  */}
//    <span>

//     {
//         signUpModal&&<SignUp/>
//     }
//    </span>

//    <button
//             onClick={() => {
//               setLoginModal(false);
//               setSignUpModal(false);
//             }}
//           >
//             Close
//           </button>
// </span>
//     </div>
//   )
// }
import React from "react";
import img from "../../assets/img.png";
import { useModal } from "../Context/ModalContext";
import Login from "../../Components/features/auth/Login";
import SignUp from "../../Components/features/auth/Signup";
import { useNavigate } from "react-router-dom";

export const HomeModal = () => {
  const navigate=useNavigate();
  const {
    loginModal,
    signUpModal,
    setLoginModal,
    setSignUpModal,
  } = useModal();

  if (!loginModal && !signUpModal) return null;

  return (
    /*  Overlay */
    <div className="overlay">
      
      
      {/* Modal Box */}
      <div className="modal-box  border relative border-main-border ">

        {/*  Left Section (40%) */}
        <div className="w-[40%] max-h-[80vh] max-md:hidden">
          <img
            src={img}
            alt="Taskflow"

            className="h-full object-center"
          />
        </div>

        {/*  Right Section (60%) */}
        <div className="w-[55%] p-10 h-full max-md:w-full  text-white flex flex-col  gap-[1.5vw]">
           <button
            onClick={() => {
              navigate("/");
              setLoginModal(false);
              setSignUpModal(false);
            }}
            className="absolute top-4 right-4 z-50 rounded-md bg-black text-white md:w-16 sm:w-12 w-11 h-7 sm:h-10 flex items-center justify-center hover:bg-gray-800"
          >
            Close
          </button>
          {loginModal &&
         <div className="align-center">
            <div className="login flex items-center justify-center login-custom ">Login </div>

<div className="md:mt-4 mt-3  login-text-font login-custom w-full">
    <span className="line mx-2"></span>
    Login With Email
      <span className="line mx-2"></span>
</div>
 
              <Login />
         </div>
        }
          {signUpModal &&

          <div className="">
          <div className="w-full flex flex-col  items-center">
          <div className="font-semibold text-[1.5rem] leading-[140%] text-white">Sign Up</div>

          <div className="sm:flex text-center w-full justify-center h-full">
             <span className="line2 sm:mx-2"></span>
           <div className="opacity-100 mt-1 sm:font-semibold text-[1.2rem] leading-[140%]">Sign Up with email</div>
             <span className="line2 sm:mx-2"></span>
          </div>
            </div>
          <SignUp />
         
          </div>
          }

         
        </div>

      </div>
    </div>
  );
};
