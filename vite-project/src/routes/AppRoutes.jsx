import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login"
import {TaskBoard} from "../features/tasks/TaskBoard";
import ProtectedRoute from "../Components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import {TaskRender} from "../features/tasks/TaskRender";
import  {TaskColumn}  from "../features/tasks/TaskColumn";
import { TaskProvider } from "../Context/TaskContext";
import { TaskSearch } from "../features/tasks/TaskSearch";
import { FilterPanel } from "../features/tasks/FilterPanel";
import { Logout } from "../features/tasks/Logout";
import {AuthLoader} from '../Components/authLoader'
const AppRoutes = () => (
  <Routes>
    
    <Route path="/login" element={<Login />} />
    <Route element={ <AuthLoader/> }>
<Route path="/dashboard"  element={
          <>
          <Logout/>
<TaskProvider>
   
  <TaskSearch/> 
  <FilterPanel/>
  <TaskBoard />
  <TaskRender/>
          {/* <TaskColumn/> */}
</TaskProvider>

</>
}/>
</Route>
       {/* </authLoader> */}
     <Route path="*" element={<Navigate to= "/dashboard"/>}/>
   
  </Routes>
);

export default AppRoutes;
