import SignUp2 from "./Signup";
import { useSignUp } from "../hooks/useSignUp";
import React from "react";
export const SignUp=()=>{
const{handleSubmit,LoginHandler,onSubmit,control}=useSignUp();
return(
    <SignUp2
    handleSubmit={handleSubmit}
    LoginHandler={LoginHandler}
    onSubmit={onSubmit}
    control={control}
    />
)
}