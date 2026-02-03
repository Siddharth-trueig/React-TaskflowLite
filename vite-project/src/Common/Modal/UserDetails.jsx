import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "../Context/ModalContext";
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";
import { findUser } from "../../services/TaskService";
import Mask from "../../assets/Mask.png";
import { updateUser,loginUser } from "../../services/TaskService";

export const UserDetails = () => {
  const { userDetails, setUserDetails } = useModal();
  const today = new Date().toISOString().split("T")[0];
  const [currUser, setCurrUser] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = JSON.parse(localStorage.getItem("Token"));

  const userName = user.name??user.UserName;
  console.log("User Name is ", userName);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await loginUser(userName);
        console.log("Current user value",res);
        setCurrUser(res[0]);
      } catch (err) {
        console.error("Error fetching current user", err);
      }
    }

    if (userName) {
      fetchCurrentUser();
    }
  }, [userName]);

  async function saveData(formData) {
    // const{ fullName,UserName,Email,PhoneNumber,gender,dob,address,zip,state}=formData;
    await updateUser({
      id: currUser.id,
      fullName: formData.fullName,
      UserName: formData.UserName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      dob: formData.dob,
      address: formData.address,
      zip: formData.zip,
      state: formData.state,
    });
    setUserDetails(false);
  }

  useEffect(() => {
    if (!userDetails || !currUser) return;

    async function fetchUser() {
      try {
        const res = await findUser(currUser?.id);
        const user = Array.isArray(res) ? res[0] : res;
        console.log("user details is", user);

        // Prefill form
        setValue("fullName", user.fullName);
        setValue("UserName", user.UserName);
        setValue("Email", user.Email);
        setValue("PhoneNumber", user.PhoneNumber);
        setValue("gender", user.gender);
        setValue("dob", user.dob);
        setValue("address", user.address);
        setValue("zip", user.zip);
        setValue("state", user.state);
      } catch (err) {
        console.error("Failed to load user details", err);
      }
    }

    fetchUser();
  }, [userDetails, currUser]);

  if (!userDetails) return null;

  return (
    <div>
      {userDetails && (
        <div>
          <div className="overlay">
            <div className="bg-[#200B33] text-white w-[80%] h-[80%] rounded-md flex flex-col justify-center items-center">
              <div>
                <div className="ml-10">
        
                  <img src={Mask} width="40px" />
                </div>

                <span>
                  User Name: <span>{currUser?.UserName}</span>
                </span>
              </div>
              <form onSubmit={handleSubmit(saveData)}>
                <div className="flex gap-x-4">
                  {/* Left Section  */}

                  <div className="h-full w-full">
                    <Input
                      label="Full Name"
                      type="text"
                      register={register}
                      name="fullName"
                      error={errors.fullName}
                      className={"inputfield2"}
                    />
                    <Input
                      label="Email"
                      type="email"
                      register={register}
                      name="Email"
                      error={errors.email}
                      className={"inputfield2"}
                    />

                    <Select
                      label="Gender"
                      name="gender"
                      register={register}
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ]}
                      error={errors.gender}
                      className={"inputfield2"}
                    />

                    <Input
                      label="Address"
                      type="text"
                      register={register}
                      name="address"
                      error={errors.address}
                      className={"inputfield2"}
                    />
                    <Input
                      label="State"
                      type="text"
                      register={register}
                      name="state"
                      error={errors.state}
                      className={"inputfield2"}
                    />
                  </div>

                  {/* Right Section  */}
                  <div className=" h-full w-full">
                    <Input
                      label="User Name"
                      type="text"
                      register={register}
                      name="UserName"
                      error={errors.UserName}
                      className={"inputfield2"}
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      register={register}
                      name="PhoneNumber"
                      error={errors.phone}
                      className={"inputfield2"}
                    />

                    <Input
                      label="Date of Birth"
                      type="date"
                      register={register}
                      name="dob"
                      error={errors.dob}
                      className={"inputfield2"}
                      max={today}
                    />

                    <Input
                      label="Zip Code"
                      type="text"
                      register={register}
                      name="zip"
                      error={errors.zip}
                      className={"inputfield2"}
                    />
                  </div>
                </div>
                <button type="submit" className="saveBtn">
                  {" "}
                  Save
                </button>
              </form>

              <button onClick={() => setUserDetails(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
