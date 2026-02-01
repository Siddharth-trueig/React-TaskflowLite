import { useForm } from "react-hook-form";
import { useAuth } from "../../../Common/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
 const navigate = useNavigate();

  const onSubmit = () => {
    console.log("submitted");
    login();
console.log("submitted");
   navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input {...register("email", { required: true })} placeholder="Email" />
      <input type="password" {...register("password", { required: true })} /> */}

      <input
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
/>

<input
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
/>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
