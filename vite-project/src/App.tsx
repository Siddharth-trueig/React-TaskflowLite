import { useState } from 'react'
import Login from './Components/features/auth/Login'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
import {AuthProvider} from  './Context/AuthContext.jsx'
import AppRoutes from './routes/AppRoutes'

=======
import {AuthProvider} from  './Common/Context/AuthContext'
import AppRoutes from './Common/routes/AppRoutes'
>>>>>>> c52e219 (Changed the folder structure)
function App() {


  return (
    <>
    
 <AppRoutes/>
   
 
    </>
  )
}

export default App
