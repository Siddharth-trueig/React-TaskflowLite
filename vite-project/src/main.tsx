import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './features/auth/Login'
import './index.css'
import {AuthProvider} from  './Context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './Common/Redux/Store'
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

     <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
  {/* <Login/> */}
  <App/>
  </BrowserRouter>
   </Provider>
   </AuthProvider>
)
