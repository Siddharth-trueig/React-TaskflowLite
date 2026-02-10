import { useEffect, useState } from "react";

export const useEditTaskModal = (task, onSave) => {
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    priority: "",
    dueDate: "",
    assignee: "",
  });

  useEffect(() => {
    if (task) {
      const { id, ...rest } = task; // remove id
      setFormData(rest);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
