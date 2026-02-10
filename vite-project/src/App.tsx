import { useState } from 'react'
import Login from './Components/features/auth/Login/Components/Login.jsx'
import './global.css'
import ErrorBoundary from './Common/ErrorBoundary/ErrorBoundary.jsx'
import { BrowserRouter } from 'react-router-dom'
import {AuthProvider} from  './Common/Context/AuthContext'
import AppRoutes from './Common/routes/AppRoutes'
import {ModalProvider} from './Common/Context/ModalContext'
import {HomeModal} from './Common/Modal/HomeModal'
import {Header} from './Common/Header/Header'
// import {LogoutModal} from './Common/Modal/LogoutModal'
import {UserDetails} from './Common/Modal/UserDetails'
import {AppRoutes2} from './Common/routes/AppRoutes2'
import { ToastContainer,toast } from 'react-toastify'
function App() {


  return (
    <>
    <ErrorBoundary>

    
    <ModalProvider>
      <AppRoutes2/>
      <ToastContainer/>
 {/* <AppRoutes/> */}
 {/* <Header/>
 <HomeModal/>
 <LogoutModal/>
 <UserDetails/> */}
 </ModalProvider>
   
 </ErrorBoundary>
    </>
  )
}

export default App
