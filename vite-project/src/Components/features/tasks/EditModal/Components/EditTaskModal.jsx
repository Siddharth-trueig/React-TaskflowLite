import { useState, useEffect } from "react";
import './EditModal.css'
export const EditTaskModal2 = ({ formData,handleChange,handleSubmit,onClose }) => {
  // const [formData, setFormData] = useState({
  //   title: "",
  //   status: "",
  //   priority: "",
  //   dueDate: "",
  //   assignee: "",
  // });

  // useEffect(() => {
  //   if (task) {
  //     const { id, ...rest } = task; // remove id
  //     setFormData(rest);
  //   }
  // }, [task]);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = () => {
  //   onSave(formData);
  // };

  return (
    <div className="modal-backdrop ">
      <div className="modal">
        <h2>Edit Task</h2>

        <label>Title</label>
        <input name="title" value={formData.title} className="inputfield2" required onChange={handleChange} />

        <label>Status</label>
        <select name="status" value={formData.status} className="select " required onChange={handleChange}>
          <option value="todo" >To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <label>Priority</label>
        <select name="priority" value={formData.priority} className="select " required onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Due Date</label>
        <input type="date" name="dueDate" value={formData.dueDate} className="inputfield2" required onChange={handleChange} />

        <label>Assignee</label>
        <input name="assignee" value={formData.assignee} className="inputfield2" required onChange={handleChange} />

        <div className="actions">
          <button onClick={handleSubmit} className="mainBtn">Save</button>
          <button onClick={onClose} className="mainBtn">Cancel</button>
        </div>
      </div>
    </div>
  );
};
