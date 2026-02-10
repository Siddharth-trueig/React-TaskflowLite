import React from "react";
import { useForm,Controller } from "react-hook-form";
import { useAuth } from "../../../../../Common/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../../../Common/Context/ModalContext";
import { addUser } from "../../../../../services/TaskService";

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const { setLoginModal, setSignUpModal, setInDashboard } = useModal();
  const onSubmit = async (data) => {
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
        PhoneNumber: data.PhoneNumber,
      };
      const newuser = await addUser(data);
      console.log("newuser data details", newuser.data);
      localStorage.setItem("Token", JSON.stringify(userData));
      console.log(data.UserName + " has been successfully registered");

      navigate("/dashboard");
      setInDashboard(true);
      setLoginModal(false);
      setSignUpModal(false);
    }
  };

  function LoginHandler() {
    setSignUpModal(false);
    setLoginModal(true);
  }
  return {handleSubmit,LoginHandler,onSubmit,control}
};
