import { useTask } from "../../../../../Common/Context/TaskContext";
import React, { useEffect, useRef, useState } from "react";
import { deleteTask,updateTask } from "../../../../../services/TaskService";

import { retryToast } from "../../../../../Common/Toast/Toast";
import { toast } from "react-toastify";
export const useColumn=()=>{
     const {
    Ctasks,
    setCtasks,
    activeCard,
    setActiveCard,
    allChecks,
    setAllChecks,
  } = useTask();

  const [dropDown, setDropDown] = useState([
    { type: "todo", dropDown: false },
    { type: "inProgress", dropDown: false },
    { type: "done", dropDown: false },
  ]);

  function handleCollapse(type) {
    setDropDown((prev) =>
      prev.map((item) =>
        item.type === type ? { ...item, dropDown: !item.dropDown } : item,
      ),
    );
  }

  const showBasicToast = (id) => {
    toast("🦄 Undo Delete!", {
      position: "top-right",
      autoClose: 4500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClick: () => {
        handleUndo(id);
      },
    });
  };

  const timerRef = useRef({});
  const currRef = useRef({});
  // local state for edit
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const deleteTaskLogic = async (id) => {
    await deleteTask(id);
    setCtasks((prev) => prev.filter((task) => task.id !== id));
  };
  /* ================= DELETE ================= */
  const handleDelete = (id) => {

    if (currRef.current[id]) {
      currRef.current[id].style.display = "none";
    }
    showBasicToast(id);
    timerRef.current[id] = setTimeout(async () => {
      try {
        console.log("Inside Try Block");
        const result = await deleteTaskLogic(id);
        delete timerRef.current[id];
        delete currRef.current[id];
      } 
      catch (error) {
        if (currRef.current[id]) {
          currRef.current[id].style.display = "block";
        }
        console.error("Delete failed");
        retryToast({
          message: "Error Occured While Deleting task",
          retry: () => deleteTaskLogic(id),
        });
      }
    }, 4000);
  };

  const handleUndo = (id) => {
    console.log("Inside Handle Undo ", currRef);

    if (timerRef.current[id]) {
      clearTimeout(timerRef.current[id]);
      delete timerRef.current[id];
    }

    if (currRef.current[id]) {
      currRef.current[id].style.display = "block";
    }
  };

  //isko banaya hai memory leaks bachane ke liye
  useEffect(() => {
    console.log("Inside USeEffect ", timerRef);
    return () => {
      Object.values(timerRef.current).forEach((timerId) =>
        clearTimeout(timerId),
      );
    };
  }, []);

  /* ================= EDIT ================= */
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };


  function checkBoxHandler(e) {
    let isChecked = e.target.checked;
    let id = e.target.value;
    console.log("value of allchecks ", allChecks);
    if (isChecked) {
      setAllChecks([...allChecks, id]);
    } else {
      setAllChecks((prevData) => {
        return prevData.filter((taskid) => {
          return taskid !== id;
        });
      });
    }
  }

  const editSave = async ({ id, updatedData }) => {
    const updatedTask = await updateTask({
      id: id,
      ...updatedData,
    });

    setCtasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { id, ...updatedData } //  merge
          : task,
      ),
    );
    closeModal();
  };

  const handleSave = async (updatedData) => {
    const { id } = selectedTask;
    try {
      await editSave({ id, updatedData });
    } catch (err) {
      console.error("Update failed");
      retryToast({
        message: "Error Occured While Updating task",
        retry: () => editSave({ id, updatedData }),
      });
    }
  };

  const taskToMove = () => {
    if (allChecks.length > 0) {
      return Ctasks.filter((task) => allChecks.includes(String(task.id)));
    } else {
      const singleTask = Ctasks.find((task) => task.id == activeCard);
      return singleTask ? [singleTask] : [];
    }
  };

  const onDrop = async (status, position) => {
    console.log(
      `${activeCard} is going to place into ${status} and at the position ${position} `,
    );
    if (activeCard == null || activeCard === undefined) return;

    const tasks = taskToMove();

    const updateSelectedTask = tasks.map((task) => ({
      ...task,
      status,
    }));
    console.log("UpdateSelectedTask", updateSelectedTask);
    const removeSelected = Ctasks.filter(
      (task) => !tasks.some((t) => t.id === task.id),
    );

    console.log("Remove Selected", removeSelected);


    const updatedTasks = [...removeSelected];
    updatedTasks.splice(position, 0, ...updateSelectedTask);
    setCtasks(updatedTasks);
    //Backend Logic

    try {
      for (const task of updateSelectedTask) {
        await updateTask({
          id: task.id,
          status,
        });
      }
    } catch (error) {
      console.log("Error occured in update in backend", error);
    }
    setActiveCard(null);
    setAllChecks([]);
  };
  /* ================= UI ================= */

  

  const isCollapsed = (type) => dropDown.find(item => item.type === type)?.dropDown ?? false;

  useEffect(() => {
    const data = localStorage.getItem("dropDownState");
    console.log("data value is ",data);
    if (data) setDropDown(JSON.parse(data));
  }, []);
  


  useEffect(() => {
    localStorage.setItem("dropDownState", JSON.stringify(dropDown));
  }, [dropDown]);


  const hastask=(status)=> status.length > 0

  return{hastask,isCollapsed,
    onDrop,allChecks,handleSave,checkBoxHandler,closeModal
    ,handleEditClick,handleDelete,handleCollapse,currRef,isModalOpen,
selectedTask,setActiveCard}
}