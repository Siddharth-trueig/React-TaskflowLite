import { useMemo } from "react";
import { useTask } from "../Context/TaskContext";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTodo } from "../Common/Redux/todoSlice";
export const useFilteredTasks = () => {
  const tasks=useSelector((state)=>{
    console.log("state.todo is ",state.todos.todo);
    return state.todos.todo
  })
  const { Ctasks, searchval, priorityFilter } = useTask();

   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo()); 
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    // let tasks = Ctasks;

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
  }, [tasks]);

  return filteredTasks;
};
