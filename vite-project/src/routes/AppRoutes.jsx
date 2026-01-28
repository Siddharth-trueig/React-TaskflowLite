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
const AppRoutes = () => (
  <Routes>
    <Route path="*" element={<Navigate to= "/dashboard"/>}/>
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
<TaskProvider>
  <TaskSearch/> 
  <FilterPanel/>
          <TaskBoard />
          <TaskRender/>
          {/* <TaskColumn/> */}
</TaskProvider>
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
