import React, { useEffect, useState } from "react";
import { useCreateTask } from "../../../Common/hooks/useCreateTask";
import { useTask } from "../../../Common/Context/TaskContext";
import { useNavigate } from "react-router-dom";
// import { addTodo } from "../../Common/Redux/todoSlice";
import {useSelector,useDispatch} from 'react-redux'

export const TaskBoard = () => {
  const dispatch=useDispatch();
  
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

const navigate=useNavigate()
  const [tasks, setTasks] = useState([]);

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const newTask = await createTask(formData);
    // if (!newTask) return;

    // setTasks([...tasks, newTask]);
    // setCtasks((prevTasks) => [...prevTasks, newTask]);
    dispatch(addTodo(formData));

    setFormData({
      title: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      assignee: "",
    });
    // console.log("Ctasks",Ctasks);
    setShowModal(false);
  };

  return (
  <>
    <button onClick={() => setShowModal(true)}>
      + Add Task
    </button>

    {showModal && (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <h3>Add New Task</h3>

          <form onSubmit={handleSubmit}>
            <span>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
              />
            </span>

            <span>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </span>

            <span>
              <label htmlFor="priority">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </span>

            {/* <div>
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div> */}

             <div>
    <label htmlFor="dueDate">Due Date</label>
    <input
      id="dueDate"
      name="dueDate"
      type="date"
      required
      value={formData.dueDate}
      onChange={handleChange}
      min={new Date().toISOString().split("T")[0]}
    />
    <small style={{ color: "#666" }}>
      Deadline must be today or a future date
    </small>
  </div>

            <div>
              <label htmlFor="assignee">Assignee</label>
              <input
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Add Task"}
              </button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    )}
  </>
)
}
// TaskBoard component code above...

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
 background: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#d8ce0fd0",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
};
