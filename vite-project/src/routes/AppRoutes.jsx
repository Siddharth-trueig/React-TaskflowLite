import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login"
import {TaskBoard} from "../features/tasks/TaskBoard";
import ProtectedRoute from "../Components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import {TaskRender} from "../features/tasks/TaskRender";
import  {TaskColumn}  from "../features/tasks/TaskColumn";
const AppRoutes = () => (
  <Routes>
    <Route path="*" element={<Navigate to= "/dashboard"/>}/>
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <TaskBoard />
          <TaskRender/>
          <TaskColumn/>
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
