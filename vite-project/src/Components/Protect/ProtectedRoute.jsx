import { Navigate } from "react-router-dom";
import { useAuth } from "../../Common/Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  // const { token } = useAuth();
  const token=localStorage.getItem("Token");
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
