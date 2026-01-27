import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login"
// import TaskBoard from "../features/tasks/TaskBoard";
import ProtectedRoute from "../Components/ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <TaskBoard />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
