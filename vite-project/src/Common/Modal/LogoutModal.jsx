import React from 'react'
import { useModal } from '../Context/ModalContext'
import { useNavigate } from 'react-router-dom'

export const LogoutModal = () => {
  const { logoutModal, setLogoutModal, setInDashboard } = useModal();
  const navigate = useNavigate();

  if (!logoutModal) return null; 

  function handleNo() {
    setLogoutModal(false);
  }

  function handleLogout() {
    localStorage.removeItem("Token");
    setInDashboard(false);
    setLogoutModal(false);
    navigate("/");
  }

  return (
    <div>
 {logoutModal&&
 <div className="overlay">
      <div className="modal-box bg-[#430356d1] text-center w-[40%] h-[20%] text-white p-2 rounded-md  flex flex-col gap-1.5-Modal">
        <p>Are you sure you want to logout?</p>
        <button onClick={handleLogout} className='p-2 mt-2 bg-amber-700 rounded-full'>YES</button>
        <button onClick={handleNo} className='p-2 mt-2 bg-amber-700 rounded-full'>NO</button>
      </div>
    </div>
    }
    </div>
   
  );
};
