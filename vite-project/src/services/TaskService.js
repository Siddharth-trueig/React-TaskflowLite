import axios from "axios";
import {toast} from 'react-toastify'
export const fetchTask = async () => {
  try{
const tasks = await axios.get("http://localhost:3000/task");
return tasks.data;
  }
  catch(error){
    console.log("Error Occured While fetching Data",error);
    toast.error(`Error Occured While Fetching ${error}`);
  }
  // console.log(tasks.data);
};

export const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/task/${id}`);
    console.log(res.status);
  } catch (error) {
      toast.error(`Error Occured While deleting task ${error}`);
  }
};

export const updateTask = async ({
  id,
  title,
  priority,
  status,
  dueDate,
  assignee,
}) => {
  try{
 const updateTask = await axios.patch(`http://localhost:3000/task/${id}`, {
    title,
    priority,
    status,
    dueDate,
    assignee,
  });
  console.log(updateTask);
  return updateTask;
  }
  catch(error){
  toast.error(`Error Occured While Updating task ${error}`);
  }
 
};


export const addTask = async (data) => {
  try{
  const newTask = await axios.post(`http://localhost:3000/task`, data);
  console.log(newTask.data);
  return newTask;
  }
  catch(error){
      toast.error(`Error Occured While adding task ${error}`);
  }

};

export const addUser = async (data) => {
  try{
 const newUser = await axios.post(`http://localhost:3000/users`, data);
  console.log(newUser.data);
  return newUser;
  }
 catch(error){
     toast.error(`Error Occured While adding User ${error}`);
 }
};

export const loginUser = async (username) => {
  try{
 const res = await axios.get(
    `http://localhost:3000/users?UserName=${username}`
  );
  return res.data; // array
  }
 catch(error){
  toast.error(`Error Occured While User login${error}`);
 }
};

export const findUser = async (userid) => {
  try{
const res = await axios.get(
    `http://localhost:3000/users/${userid}`
  );
  return res.data; // array
  }
  catch(error){
     toast.error(`Error Occured While Finding User ${error}`);
  }
  
};

export const updateUser = async ({
   id,
  fullName,
  UserName,
  Email,
  PhoneNumber,
  gender,
  dob,
  address,
  zip,
  state
}) => {
  try{
  const updatedDetail = await axios.patch(`http://localhost:3000/users/${id}`, {
    fullName,UserName,Email,PhoneNumber,gender,dob,address,zip,state
  });
  console.log(updatedDetail);
  return updatedDetail;
  }
catch(error){
       toast.error(`Error Occured While Update User ${error}`);
}
};

fetchTask();

