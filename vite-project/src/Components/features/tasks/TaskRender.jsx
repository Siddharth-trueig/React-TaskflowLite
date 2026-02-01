// import { useEffect, useState } from "react";
// import {
//   fetchTask,
//   updateTaskStatus,
// } from "../../services/TaskService";

// const columns = [
//   { title: "To Do", status: "todo" },
//   { title: "In Progress", status: "in-progress" },
//   { title: "Done", status: "done" },
// ];

// const TaskRender = () => {
//   const [tasks, setTasks] = useState([]);
//   const [draggedTask, setDraggedTask] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchTask();
//       setTasks(data || []);
//     } catch (err) {
//       console.error("Failed to load tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   //  Drag start
//   const handleDragStart = (task) => {
//     setDraggedTask(task);
//   };

//   //  Allow drop
//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   //  Drop handler
//   const handleDrop = async (newStatus) => {
//     if (!draggedTask) return;

//     // 1️Optimistic UI update
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === draggedTask.id
//           ? { ...task, status: newStatus }
//           : task
//       )
//     );

//     // Backend update
//     try {
//       await updateTaskStatus(draggedTask.id, newStatus);
//     } catch (err) {
//       console.error("Failed to update status");
//     }

//     setDraggedTask(null);
//   };

//   if (loading) {
//     return <p>Loading tasks...</p>;
//   }

//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       {columns.map((col) => (
//         <div
//           key={col.status}
//           onDragOver={handleDragOver}
//           onDrop={() => handleDrop(col.status)}
//           style={{
//             width: "300px",
//             minHeight: "400px",
//             border: "2px dashed #ccc",
//             padding: "10px",
//             borderRadius: "8px",
//             background: "#fafafa",
//           }}
//         >
//           <h3 style={{ textAlign: "center" }}>{col.title}</h3>

//           {tasks
//             .filter((task) => task.status === col.status)
//             .map((task) => (
//               <div
//                 key={task.id}
//                 draggable
//                 onDragStart={() => handleDragStart(task)}
//                 style={{
//                   padding: "10px",
//                   marginBottom: "10px",
//                   background: "#fff",
//                   borderRadius: "6px",
//                   boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                   cursor: "grab",
//                 }}
//               >
//                 <p><strong>{task.title}</strong></p>
//                 <p>Priority: {task.priority}</p>
//                 <p>Assignee: {task.assignee}</p>
//                 <p>Due: {task.dueDate}</p>
//               </div>
//             ))}

//           {tasks.filter((task) => task.status === col.status).length === 0 && (
//             <p style={{ textAlign: "center", color: "#999" }}>
//               No tasks
//             </p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskRender;


import { useEffect, useState } from "react";
 import {
  fetchTask,
 } from "../../../services/TaskService";
import {TaskColumn} from './TaskColumn'
import { useTask } from "../../../Common/Context/TaskContext";
import {useFilteredTasks} from '../../../Common/hooks/useFilter'

export function TaskRender(){
 const filteredTasks = useFilteredTasks();
  const {Ctasks,setCtasks,searchval} =useTask();
    const[todoStatus,setTodoStatus]=useState([]);
    const[inProgressStatus,setInProgressStatus]=useState([]);
    const[doneStatus,setDoneStatus]=useState([]);


 useEffect(() => {
    if (!filteredTasks.length) return;

    const todo = [];
    const inProgress = [];
    const done = [];
    // console.log("search value",searchval);
    // console.log("Ctasks ",Ctasks);
  //  const tasks=searchval??Ctasks;
  // const tasksToRender = searchval
  // ? Ctasks.filter(task =>
  //     task.title.toLowerCase().includes(searchval.toLowerCase())
  //   )
  // : Ctasks;

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
  }, [filteredTasks]);


return(
<TaskColumn todoStatus={todoStatus} inProgressStatus={inProgressStatus} doneStatus={doneStatus}/>
)

}

