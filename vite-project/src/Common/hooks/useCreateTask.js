import { useState } from "react";
import axios from "axios";
import {addTask} from '../../services/TaskService'
export const useCreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isValidTask = (task) => {
    return (
      task.title &&
      task.status &&
      task.priority &&
      task.dueDate &&
      task.assignee
    );
  };

  const createTask = async (task) => {
    if (!isValidTask(task)) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await addTask(task)

      return res.data; // return created task
    } catch (err) {
      setError("Failed to create task");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTask, loading, error };
};
