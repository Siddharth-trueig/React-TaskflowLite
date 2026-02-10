import { useCreateTask } from "../../../../../Common/hooks/useCreateTask";
import { useTask } from "../../../../../Common/Context/TaskContext";
import React, { useEffect, useState } from "react";
import { retryToast } from "../../../../../Common/Toast/Toast";
export const useBoard=()=>{
      const { createTask, loading, error } = useCreateTask();
  const [showModal, setShowModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { Ctasks, setCtasks } = useTask();
  const [formData, setFormData] = useState({
    title: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    assignee: "",
  });

  const [tasks, setTasks] = useState([]);

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const submitTask = async () => {
  const newTask = await createTask(formData);
  if (!newTask) return;

  setTasks((prev) => [...prev, newTask]);
  setCtasks((prev) => [...prev, newTask]);

  setFormData({
    title: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    assignee: "",
  });

  setShowModal(false);
};


  const handleSubmit = async (e) => {
    console.log("event value is ",e);
    e.preventDefault();
try{
    const newTask = await submitTask();
}
catch(error){
  console.log("catch ke andar hu");
retryToast({message:"Error Occured While Adding task", retry:submitTask}) 
}
    setShowModal(false);
  };

  return {createTask, loading, error,showModal, setShowModal,isAdded, setIsAdded, Ctasks, setCtasks,formData, setFormData,handleChange,handleSubmit}
}