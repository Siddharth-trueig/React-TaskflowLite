import { useForm,Controller } from "react-hook-form";
import { useAuth } from "../../../Common/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import {Input}  from "../../../Common/Form/Input";
import { useModal } from "../../../Common/Context/ModalContext";
import { loginUser } from "../../../services/TaskService";
import { loginFields } from "./loginFields";
import { toast } from "react-toastify";
const Login = () => {
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

  return (
    <div>

   
    <form onSubmit={handleSubmit(onSubmit)}>
   
{
  loginFields.map((field)=>(
<Controller key={field.name} name={field.name} control={control} rules={field.rules}
render={({field:rhfField,fieldState})=>(
  <Input label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={rhfField.value || ""}
              onChange={rhfField.onChange}
              onBlur={rhfField.onBlur}
              error={fieldState.error} 
              className={field.className}
              />
)}/>
  ))
}
{/* <div > */}
<a href="/" className="flex justify-center underline mt-2 hover:text-blue-600  " >
  Forgot Your Password?
</a>

{/* </div> */}

<button type="submit" className="flex justify-center items-center mx-auto LoginBtn mt-[7rem] rounded-md">Login <i class="fa-solid fa-arrow-right-to-bracket"></i></button>

    </form>

    <div className="notAccount flex justify-center mt-6">
  <span className="notAccountLft"> Don't Have an Account?</span>
 
 <a className="notAccountRgt underline ml-1  hover:text-blue-600 hover:cursor-pointer" onClick={HandleClick}>Sign Up</a>
 

</div>


 </div>
  );
};

export default Login;
