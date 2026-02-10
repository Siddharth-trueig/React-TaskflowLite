
import { useForm,Controller } from "react-hook-form";
import { useAuth } from "../../../../../Common/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../../../Common/Context/ModalContext";
import { loginUser } from "../../../../../services/TaskService";
export const useLogin=()=>{
      const { register, handleSubmit,formState: { errors },control } = useForm();
    const {
      loginModal,
      signUpModal,
      setLoginModal,
      setSignUpModal,
      setInDashboard
    } = useModal();
  const { login } = useAuth();
 const navigate = useNavigate();

 
  const onSubmit = async (data) => {

try {
    //  Call backend
    const users = await loginUser(data.UserName);

    if (users.length === 0) {
      alert("User not found");
      return;
    }

    const user = users[0];

    // Check password
    if (user.Password !== data.Password) {
      alert("Invalid Password");
      return;
    }

   
    // Optional: store session
    localStorage.setItem("Token", JSON.stringify(user));
    navigate("/dashboard");
    setInDashboard(true);
    setLoginModal(false);
    setSignUpModal(false);
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Try again!");
  }
  };

  function HandleClick(){
setLoginModal(false);
setSignUpModal(true);
  }
return {handleSubmit,HandleClick,onSubmit,control}
}