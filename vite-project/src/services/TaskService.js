import axios from "axios";

export const fetchTask = async () => {
  const tasks = await axios.get("http://localhost:3000/task");
  console.log(tasks.data);
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
};
export const addTask = async (data) => {
  const newTask = await axios.post(`http://localhost:3000/task`, data);
  console.log(newTask.data);
  return newTask;
};

const task = {
  id: 2,
  title: "Second Task",
  priority: "High",
  status: "Pending",
  dueDate: "23",
  assignee: "Naman Sir",
};

// export const updateTaskStatus = async (id, status) => {
//   return axios.patch(`http://localhost:3000/task/${id}`, { status });
// };


fetchTask();
// deleteTask();
//    fetchTask();
// addTask(task);
