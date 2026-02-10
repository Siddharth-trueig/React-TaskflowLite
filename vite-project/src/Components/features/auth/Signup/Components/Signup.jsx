import { useForm,Controller } from "react-hook-form";
import { Input } from "../../../../../Common/Form/Input";
import { signupFields } from "../Constants/SignupField"
const SignUp2 = ({handleSubmit,LoginHandler,onSubmit,control}) => {

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className=" w-full flex flex-col justify-start gap-y-[1px] font-medium text-base">
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

export default SignUp2;
