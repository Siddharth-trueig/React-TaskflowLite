import { useForm } from "react-hook-form";
import { useAuth } from "../../../Common/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../Common/Form/Input";
import { useModal } from "../../../Common/Context/ModalContext";
const Login = () => {
  const { register, handleSubmit,formState: { errors } } = useForm();
    const {
      loginModal,
      signUpModal,
      setLoginModal,
      setSignUpModal,
    } = useModal();
  const { login } = useAuth();
 const navigate = useNavigate();

  const onSubmit = (data) => {
//     console.log("submitted");
//     login();
// console.log("submitted");


//  const userData = JSON.parse(localStorage.getItem(data.UserName));
      const userData = JSON.parse(localStorage.getItem(data.name));

  if (!userData) {
    console.log("User not found");
    return;
  }

  if (userData.password !== data.Password) {
    console.log("Invalid password");
    return;
  }

  // successful login
  navigate("/dashboard");
  };

  function HandleClick(){
setLoginModal(false);
setSignUpModal(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input {...register("email", { required: true })} placeholder="Email" />
      <input type="password" {...register("password", { required: true })} /> */}

      {/* <input
  type="email"
  placeholder="Email"
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
    minLength: {
      value: 5,
      message: "Email must be at least 5 characters",
    },
    maxLength: {
      value: 50,
      message: "Email must not exceed 50 characters",
    },
  })}
/> */}

{/* <input
  type="password"
  placeholder="Password"
  {...register("password", {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    maxLength: {
      value: 20,
      message: "Password must not exceed 20 characters",
    },
  })}
/> */}
<Input label="UserName" type='text' 
rules={ {required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
    minLength: {
      value: 5,
      message: "Email must be at least 5 characters",
    },
    maxLength: {
      value: 50,
      message: "Email must not exceed 50 characters",
    },

} }   
register={register} name={'UserName'} error={errors.UserName} className={'userNamefield'}/>


<Input label="Password" type='password' 
 rules={{
    required:"Enter a Valid FirstName",
    minLength:{
        value:3,
        message:"Min Len Must be 3 characters"
    },
    maxLength:{
        value:50,
        message:"Max Len Must be inside 50"
    }
}}
register={register} name={'Password'} error={errors.Password} className={'passwordInput'}/>

<div className="forgot">
  Forgot Your Password?
</div>
<div>
<button type="submit" className="LoginBtn ">Login</button>
</div>
<div className="notAccount">
  <span className="notAccountLft"> Don't Have an Account </span>
 <button className="notAccountRgt" onClick={HandleClick}>Sign Up</button>
</div>

    </form>
  );
};

export default Login;
