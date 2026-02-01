import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, fetchTask, updateTask } from "../../services/TaskService";


export const fetchTodo=createAsyncThunk("getTodos",async()=>{

    try{
 const fetchTodo=await fetchTask();
   console.log("In fetch data in Slice ",fetchTodo);
   return fetchTodo;
    }
    catch(error){
        console.log("Error occured while fetching data",error)
    }
})

export const addTodo=createAsyncThunk("addTodo",async(data,{rejectWithValue })=>{
   
   try{
 const addTodo=await addTask(data);
 console.log("addTodo value is ",addTodo.data)
 return addTodo.data;
   }
catch(error){
// console.log("Error occured While addition of the task ",error);
return rejectWithValue(error.message);
}   
})

export const deleteTodo=createAsyncThunk("deleteTodo",async(id,{rejectWithValue})=>{
   
   try{
 const deleteTodo=await deleteTask(id);
 console.log("deleteTodo value is ",deleteTodo)
 return id;
   }
catch(error){
// console.log("Error occured While deletion of the task ",error);
return rejectWithValue(error.message);
}   
})

export const updateTodo=createAsyncThunk("updateTodo",async({id,updatedData},{rejectWithValue})=>{
//    const {id,...remaining}=updatedData;
  
   try{
 const updateTodo=await updateTask({id,...updatedData});
 console.log("updatedTodo value is ",updateTodo)
 return updateTodo.data;
   }
catch(error){
// console.log("Error occured While updation of the task ",error);
return rejectWithValue(error.message);
}   
})

export const todosSlice=createSlice({
    name:"todosSlice",
    initialState:{
        todo:[],
          loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTodo.pending,state=>{
            state.loading=true;
        })
        .addCase(fetchTodo.fulfilled,(state,action)=>{
            state.loading=false;
            state.todo=action.payload;
        })
        .addCase(fetchTodo.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })


         builder.addCase(addTodo.pending,state=>{
            state.loading=true;
        })
        .addCase(addTodo.fulfilled,(state,action)=>{
            state.loading=false;
            state.todo.push(action.payload);
        })
        .addCase(addTodo.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })

        
         builder.addCase(deleteTodo.pending,state=>{
            state.loading=true;
        })
        .addCase(deleteTodo.fulfilled,(state,action)=>{
            state.loading=false;
           state.todo= state.todo.filter((to)=>to.id!==action.payload);
        })
        .addCase(deleteTodo.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })

          builder.addCase(updateTodo.pending,state=>{
            state.loading=true;
        })
        .addCase(updateTodo.fulfilled,(state,action)=>{
            state.loading=false;
           const index = state.todo.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.todo[index] = action.payload;
        })
        .addCase(updateTodo.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})


export default todosSlice.reducer