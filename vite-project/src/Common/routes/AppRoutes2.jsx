import { Routes, Route } from "react-router-dom";
import Login from "../../Components/features/auth/Login"
import {TaskBoard} from "../../Components/features/tasks/TaskBoard";
import ProtectedRoute from "../../Components/Protect/ProtectedRoute";
import { Navigate } from "react-router-dom";
import {TaskRender} from "../../Components/features/tasks/TaskRender";
import  {TaskColumn}  from "../../Components/features/tasks/TaskColumn";
import { TaskProvider } from "../Context/TaskContext";
import { TaskSearch } from "../../Components/features/tasks/TaskSearch";
import { FilterPanel } from "../../Components/features/tasks/FilterPanel";
import { Logout } from "../../Components/features/auth/Logout";
import { Header } from "../Header/Header";
import { Home } from "../HomePage/Home";
import { HomeModal } from "../Modal/HomeModal";
export const AppRoutes2 = () => {
  return (
  <Routes>
    <Route path="*" element={<Navigate to= "/"/>}/>
    <Header/>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<HomeModal/>}/>
    <Route
      path="/dashboard"
       element={
        <ProtectedRoute>
          <Logout/>
<TaskProvider>
  <TaskSearch/> 
  <FilterPanel/>
  <TaskBoard />
  <TaskRender/>
   </TaskProvider>
   </ProtectedRoute>
        }
      />
  </Routes>
  )
}
