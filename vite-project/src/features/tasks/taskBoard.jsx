import React, { useState } from "react";
import { useCreateTask } from "../../hooks/useCreateTask";

export const TaskBoard = () => {
  const { createTask, loading, error } = useCreateTask();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = await createTask(formData);
    if (!newTask) return;

    setTasks([...tasks, newTask]);

    setFormData({
      title: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      assignee: "",
    });
  };

  return (
    <div>
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
      placeholder="Enter task title"
    />
  </span>

  <span>
    <label htmlFor="status">Status</label>
    <select
      id="status"
      name="status"
      required
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
      id="priority"
      required
      name="priority"
      value={formData.priority}
      onChange={handleChange}
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </span>

  <div>
    <label htmlFor="dueDate">Due Date</label>
    <input
      id="dueDate"
      name="dueDate"
      type="date"
      required
      value={formData.dueDate}
      onChange={handleChange}
    />
  </div>

  <div>
    <label htmlFor="assignee">Assignee</label>
    <input
      id="assignee"
      name="assignee"
      type="text"
      required
      value={formData.assignee}
      onChange={handleChange}
      placeholder="Assign to"
    />
  </div>

  <button type="submit" disabled={loading}>
    {loading ? "Saving..." : "Add Task"}
  </button>

  {error && <p style={{ color: "red" }}>{error}</p>}
</form>
    </div>
  );
};
