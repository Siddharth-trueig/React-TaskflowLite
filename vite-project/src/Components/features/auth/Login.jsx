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
//     console.log("submitted");
//     login();
// console.log("submitted");


//  const userData = JSON.parse(localStorage.getItem(data.UserName));
  //     const userData = JSON.parse(localStorage.getItem(data.Token));

  // if (!userData) {

  //   console.log("User not found");
  //   alert("User not found");
  //   return;
  // }
  // if (userData.password !== data.Password) {
  //   console.log("Invalid password");
  //    alert("Invalid Password");
  //   return;
  // }

// successful login
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

{/* //old Way we used register here  */}
{/* <Input label="UserName" type='text' 
rules={ {required: "Enter a valid first Name",
   
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
    maxLength: {
      value: 50,
      message: "Name must not exceed 50 characters",
    },

} }   
register={register} name={'UserName'} error={errors.UserName} className='inputfield2'/>


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
register={register} name={'Password'} error={errors.Password} className='inputfield2 '/> */}

{/* lets try with new way using controller  */}

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
