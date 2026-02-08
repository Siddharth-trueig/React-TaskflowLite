import { useForm,Controller } from "react-hook-form";
import { useAuth } from "../../../Common/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../Common/Form/Input";
import { useModal } from "../../../Common/Context/ModalContext";
import { addUser } from "../../../services/TaskService";
import { signupFields } from "./SignupField";
const SignUp = () => {
  const { register, handleSubmit,formState: { errors },control } = useForm();
  const { login } = useAuth();
 const navigate = useNavigate();

 const { setLoginModal,
      setSignUpModal,setInDashboard}=useModal();
  const onSubmit = async (data) => {
//     console.log("submitted");
//     login();
// console.log("submitted");
//    navigate("/dashboard");
        const existingUser = JSON.parse(localStorage.getItem(data.email));
        if (existingUser) {
            console.log("Email is already registered!");
            alert("The Email already Exist");
            return;
        } 
        else {
            const userData = {
                name: data.UserName,
                email: data.Email,
                password: data.Password,
                PhoneNumber:data.PhoneNumber
            };
                const newuser=await addUser(data);
                console.log("newuser data details",newuser.data);
            localStorage.setItem("Token", JSON.stringify(userData));
            console.log(data.UserName + " has been successfully registered");
      
               navigate("/dashboard");
            setInDashboard(true);
    setLoginModal(false);
    setSignUpModal(false);
        }
  };

  function LoginHandler(){
      setSignUpModal(false);
      setLoginModal(true);
  }
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className=" w-full flex flex-col justify-start gap-y-[1px] font-medium text-base">
       

       {/* //OLd Way hai ye ab controllers se try krte hai  */}
{/* <Input label="UserName" type='text' 
rules={ {required: "UserName is required",
    // pattern: {
    //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //   message: "Enter a valid email address",
    // },
    minLength: {
      value: 5,
      message: "Min Length must be at least 3 characters",
    },
    maxLength: {
      value: 50,
      message: "Min Length must not exceed 50 characters",
    },
} }   
register={register} name={'UserName'} error={errors.UserName} className={'inputfield2'}/>


<Input label="Email" type='email' 
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
register={register} name={'Email'} error={errors.Email} className={'inputfield2'}/>

<Input label="PhoneNumber" type="tel"
rules={{required:"Phone Number is required"
}}
register={register} name={'PhoneNumber'} error={errors.PhoneNumber} className={'inputfield2'}/>


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
register={register} name={'Password'} error={errors.Password} className={'inputfield2'}/> */}

{
signupFields.map((field)=>(
  <Controller key={field.name} name={field.name} control={control} rules={field.rules} render={({field:signField,fieldState})=>(
    <Input
    label={field.label}
    name={field.name}
    value={signField.value}
    className={field.className}
    error={fieldState.error}
    onChange={signField.onChange}
    onBlur={signField.onBlur}
    placeholder={field.placeholder}
    type={field.type}/>
  )}/>
))
}

<div className="mt-4 flex  items-center">
 <input type="checkbox" id="terms" name="terms"  required />
  <label htmlFor="terms" className="ml-2">I agree to the terms and conditions</label>
</div>

{/* <Input label="I agree to the terms and conditions" type="checkbox" rules={{required:"field is required"}} register={register} 
name={'terms'} error={errors.terms} className={'flex inline'}/> */}
 </div>  
 <div className="flex items-center justify-center">
<button type="submit" className="flex justify-center items-center rounded-md mx-auto LoginBtn md:mt-4 sm:mt-3 mt-2">Signup</button>
 </div>

    </form>
<div className="notAccount flex justify-center w-full mt-4">
  <span className="notAccountLft font-normal">
 Already Have an Account? 
  </span>
 
<a className="notAccountRgt underline  hover:text-blue-600 hover:cursor-pointer" onClick={LoginHandler}>
    Login
  </a>
  
 
</div>
</div>
  );
};

export default SignUp;
