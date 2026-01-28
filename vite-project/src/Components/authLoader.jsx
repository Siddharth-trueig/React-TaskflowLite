import { Outlet, redirect ,Navigate} from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
export const AuthLoader=()=>{
    const {token}=useAuth();
    if(!token){
    //   return  redirect("/login")
    return <Navigate to="/login" replace />;

    }
       return <Outlet/>

}