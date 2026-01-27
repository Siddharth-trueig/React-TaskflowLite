import { useState } from 'react'
import Login from './features/auth/Login'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import {AuthProvider} from  './Context/AuthContext.jsx'
import AppRoutes from './routes/AppRoutes'
function App() {


  return (
    <>
  <AppRoutes/>
    </>
  )
}

export default App
