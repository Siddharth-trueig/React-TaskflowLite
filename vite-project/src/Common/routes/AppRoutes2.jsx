import { Routes, Route } from "react-router-dom";
// import Login from "../../Components/features/auth/Login/Components/Login"
// import {TaskBoard} from "../../Components/features/tasks/TaskBoard";
import ProtectedRoute from "../../Components/Protect/ProtectedRoute";
import { Navigate } from "react-router-dom";
// import {TaskRender} from "../../Components/features/tasks/TaskRender";
// import  {TaskColumn}  from "../../Components/features/tasks/TaskColumn/Components/TaskColumn";
import { TaskColumn } from "../../Components/features/tasks/TaskColumn/Components/index";
import { TaskProvider } from "../Context/TaskContext";
// import { TaskSearch } from "../../Components/features/tasks/TaskSearch";
// import { FilterPanel } from "../../Components/features/tasks/FilterPanel";
// import { Logout } from "../../Components/features/auth/Logout";
import { Home } from "../HomePage/Home";
import { HomeModal } from "../Modal/HomeModal";
import { Header } from "../Header/Header";
import { Task } from "../Combo/Task";
import { LogoutModal } from "../Modal/LogoutModal";
import { UserDetails } from "../Modal/UserDetails";
export const AppRoutes2 = () => {
  return (
  <Routes>
    <Route path="*" element={<Navigate to= "/"/>}/>
    <Route path="/" element={<Header/>}>
    <Route index element={<Home/>}/>
   
    <Route path='/login' element={<HomeModal/>}/>
    <Route
      path="/dashboard"
       element={
        <ProtectedRoute>
          <LogoutModal/>
          <UserDetails/>
<TaskProvider>
  <Task/>
   </TaskProvider>
   </ProtectedRoute>
        }
      />
      </Route>
  </Routes>
  )
}
