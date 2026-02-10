import { Routes, Route } from "react-router-dom";
import Login from "../../Components/features/auth/Login/Components/Login"
// import {TaskBoard} from "../../Components/features/tasks/TaskBoard";
import ProtectedRoute from "../../Components/Protect/Protected";
import { Navigate } from "react-router-dom";
// import {TaskRender} from "../../Components/features/tasks/TaskRender";

import { TaskProvider } from "../Context/TaskContext";
// import { TaskSearch } from "../../Components/features/tasks/TaskSearch";
import { FilterPanel } from "../../Components/features/tasks/FilterPanel/Components";
// import { Logout } from "../../Components/features/auth/Logout";
import { Header } from "../Header/Header";
const AppRoutes = () => (
//   <Routes>
//     <Route path="*" element={<Navigate to= "/dashboard"/>}/>
//     <Route path="/login" element={<Login />} />
//     <Route
//       path="/dashboard"
//       element={
//         <ProtectedRoute>
//           <Logout/>
// <TaskProvider>
//   <TaskSearch/> 
//   <FilterPanel/>
//   <TaskBoard />
//   <TaskRender/>
          {/* <TaskColumn/> */}
  // </TaskProvider>
  //         </ProtectedRoute>
  //       }
  //     />

  //     <Route path="/" element={<Header/>}/>
  // </Routes> 

 
);

export default AppRoutes;
