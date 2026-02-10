import { useEffect, useState } from "react";
 import {
  fetchTask,
 } from "../../../../services/TaskService";
import { TaskColumn } from "../TaskColumn/Components/index";
import { useTask } from "../../../../Common/Context/TaskContext";
import {useFilteredTasks} from '../../../../Common/hooks/useFilter'

export function TaskRender(){
 const filteredTasks = useFilteredTasks();
  const {Ctasks,setCtasks,searchval} =useTask();
    const[todoStatus,setTodoStatus]=useState([]);
    const[inProgressStatus,setInProgressStatus]=useState([]);
    const[doneStatus,setDoneStatus]=useState([]);
    const [loading,setLoading]=useState(false);
 useEffect(() => {
   
    setLoading(true);
 if (!Ctasks.length) return;
    const todo = [];
    const inProgress = [];
    const done = [];
    filteredTasks.forEach((task) => {
 if (!task || !task.status) return;

      if (task.status === "todo") todo.push(task);
      else if (task.status === "in-progress") inProgress.push(task);
      else if (task.status === "done") done.push(task);
    });
console.log("tasks",Ctasks);
    setTodoStatus(todo);
    setInProgressStatus(inProgress);
    setDoneStatus(done);
    setLoading(false);
  }, [filteredTasks]);


return(
<TaskColumn todoStatus={todoStatus} inProgressStatus={inProgressStatus} doneStatus={doneStatus} loading={loading} />
)

}

