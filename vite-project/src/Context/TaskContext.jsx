import { useContext, createContext, useEffect, useState } from "react";
const TaskContext = createContext();
import { fetchTask } from "../services/TaskService";

export const TaskProvider = ({ children }) => {
  const [Ctasks, setCtasks] = useState([]);
  const [Loading, setLoading] = useState(false);
  const[searchval,setSearchval]=useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const[activeCard,setActiveCard]=useState(null);
//  async function render(){
//       const data = await fetchTask();
//       setCtasks(data);
//   }
//  async function render() {
    // useEffect(async () => {  
    //   const data = await fetchTask();
    //   setCtasks[data];
    // }, []);
    // const data=await fetchTask();
    // console.log("data is ",data);
  //   setCtasks(data);
  //   console.log("Ctasks from TaskContext",Ctasks);
  // }
  // render();

   useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTask();
        setCtasks(data || []);
      
      } catch (err) {
        console.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
          console.log("Data once Fetched",Ctasks);
      }
    };

    loadTasks();
  }, []);


  return (
    <TaskContext.Provider value={{ Ctasks, setCtasks, Loading, setLoading,searchval,setSearchval,priorityFilter,setPriorityFilter,activeCard,setActiveCard }}>
      {children}
    </TaskContext.Provider>
  );
};
export const useTask = () => useContext(TaskContext);
