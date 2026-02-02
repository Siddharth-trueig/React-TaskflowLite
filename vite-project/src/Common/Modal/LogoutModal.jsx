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
      <div className="modal-box logout-Modal">
        <p>Are you sure you want to logout?</p>
        <button onClick={handleLogout}>YES</button>
        <button onClick={handleNo}>NO</button>
      </div>
    </div>
    }
   
    </div>
   
  );
};
