import { useMemo } from "react";
import { useTask } from "../Context/TaskContext";

export const useFilteredTasks = () => {
  const { Ctasks, searchval, priorityFilter } = useTask();

  const filteredTasks = useMemo(() => {
    let tasks = Ctasks;

    // Search filter
    if (searchval){
      tasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchval.toLowerCase())
      );
    }

    // Priority filter
    if (priorityFilter !== "all") {
      tasks = tasks.filter(task =>
        task.priority === priorityFilter
      );
    }

    return tasks;
  }, [Ctasks, searchval, priorityFilter]);

  return filteredTasks;
};
