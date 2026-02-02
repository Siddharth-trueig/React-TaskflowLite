import axios from "axios";

export const fetchTask = async () => {
  const tasks = await axios.get("http://localhost:3000/task");
  // console.log(tasks.data);
  return tasks.data;
};

export const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/task/${id}`);
    console.log(res.status);
  } catch (error) {
    throw error;
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
  const updateTask = await axios.patch(`http://localhost:3000/task/${id}`, {
    title,
    priority,
    status,
    dueDate,
    assignee,
  });
  console.log(updateTask);
  return updateTask;
};
export const addTask = async (data) => {
  const newTask = await axios.post(`http://localhost:3000/task`, data);
  console.log(newTask.data);
  return newTask;
};

export const addUser = async (data) => {
  const newUser = await axios.post(`http://localhost:3000/users`, data);
  console.log(newUser.data);
  return newUser;
};

export const loginUser = async (username) => {
  const res = await axios.get(
    `http://localhost:3000/users?UserName=${username}`
  );
  return res.data; // array
};

export const findUser = async (userid) => {
  const res = await axios.get(
    `http://localhost:3000/users/${userid}`
  );
  return res.data; // array
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
  const updatedDetail = await axios.patch(`http://localhost:3000/users/${id}`, {
    fullName,UserName,Email,PhoneNumber,gender,dob,address,zip,state
  });
  console.log(updatedDetail);
  return updatedDetail;
};

fetchTask();

