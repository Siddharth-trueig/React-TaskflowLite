import { useForm } from "react-hook-form";
import { useAuth } from "../../../Common/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../Common/Form/Input";
import { useModal } from "../../../Common/Context/ModalContext";

const SignUp = () => {
  const { register, handleSubmit,formState: { errors } } = useForm();
  const { login } = useAuth();
 const navigate = useNavigate();

 const { setLoginModal,
      setSignUpModal,}=useModal();
  const onSubmit = (data) => {
//     console.log("submitted");
//     login();
// console.log("submitted");
//    navigate("/dashboard");
        const existingUser = JSON.parse(localStorage.getItem(data.email));
        if (existingUser) {
            console.log("Email is already registered!");
            alert("The Email already Exist");
            return;
        } else {
            const userData = {
                name: data.UserName,
                email: data.Email,
                password: data.Password,
                PhoneNumber:data.PhoneNumber
            };
            localStorage.setItem(data.email, JSON.stringify(userData));
            console.log(data.name + " has been successfully registered");
        }

  };

  function LoginHandler(){
      setSignUpModal(false);
      setLoginModal(true);
  }
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="SignUpDiv">
       
<Input label="UserName" type='text' 
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
register={register} name={'UserName'} error={errors.UserName} className={'inputfield'}/>


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
register={register} name={'Email'} error={errors.Email} className={'inputfield'}/>

<Input label="PhoneNumber" type="tel"
rules={{required:"Phone Number is required",
        pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a Valid Phone Number",
    },
    minLength: {
      value: 10,
      message: "Enter a valid numbe r",
    },
    maxLength: {
      value: 12,
      message: "Enter a valid number",
    },
}}
register={register} name={'PhoneNumber'} error={errors.PhoneNumber} className={'inputfield'}/>


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
register={register} name={'Password'} error={errors.Password} className={'inputfield'}/>

<div className="mt-4">
 <input type="checkbox" id="terms" name="terms" required />
  <label for="terms">I agree to the terms and conditions</label>
</div>

{/* <Input label="I agree to the terms and conditions" type="checkbox" rules={{required:"field is required"}} register={register} 
name={'terms'} error={errors.terms} className={'flex inline'}/> */}
 </div>  
 <div className="flex items-center justify-center">
<button type="submit" className="signupBtn">Signup</button>
 </div>

    </form>
<div className="notAccount">
  <span className="notAccountLft">
 Already Have an Account? 
  </span>
  <button className="notAccountRgt" onClick={LoginHandler}>
    Login
  </button>
 
</div>
</div>
  );
};

export default SignUp;
