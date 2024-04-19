
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
const apiUrl = "https://be-todo-h20h.onrender.com/api/tasks";
const url = proxyUrl + apiUrl;

// const URI = "https://be-todo-h20h.onrender.com/api/tasks";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(url)
  const data = response.data.data;
  const newTodos = data.filter(todo => todo.status === false)
  return newTodos;
});
export const fetchCompletedTodos = createAsyncThunk(
  "todos/fetchCompletedTodos",
  async () => {
    const response = await axios.get(url);
    const todos = response.data.data;
    const completedTodo = todos.filter((todo) => todo.status === true);
    console.log({ response });
    return completedTodo;
  }
);

export const fetchTodo = createAsyncThunk("todos/fetchTodo", async (id) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
});

export const createTodo = createAsyncThunk("todos/createTodo", async (newTodo) => {
  const response = await axios.post(url, newTodo);
  console.log(response.data);
  return response.data;
});

export const editTodo = createAsyncThunk("todos/editTodo", async (updatedTodo) => {
  const id = updatedTodo.id;
  console.log({id});
  const response = await axios.put(`${url}/${id}`, updatedTodo);
  console.log({response});
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${url}/${id}`);
  return id;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    todo: {},
    completedTodos: [],
    isEdit: false,
    error: null,
  },
  reducers: {
    toggleEdit(state, action) {
      state.isEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
     builder.addCase(fetchTodos.fulfilled, (state, action) => {
      //  console.log(action.payload);
       state.todos = action.payload;
     });
     builder.addCase(fetchTodos.rejected, (state, action) => {
      //  console.log(action.payload);
       state.error = action.error.message;
     });
     builder.addCase(fetchTodo.fulfilled, (state, action) => {
      //  console.log(action.payload);
       state.todo = action.payload;
     });
     builder.addCase(fetchTodo.rejected, (state, action) => {
      //  console.log(action.payload);
       state.error = action.error.message;
     });
     builder.addCase(fetchCompletedTodos.fulfilled, (state, action) => {
       console.log(action.payload);
       state.completedTodos = action.payload;
     });
     builder.addCase(fetchCompletedTodos.rejected, (state, action) => {
       console.log(action.payload);
       state.error = action.error.message;
     });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      // console.log(action.payload)
      state.todos.push(action.payload);
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.message;
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      // console.log(action.payload)
     const updatedTodo = action.payload;
     console.log({updatedTodo});
     console.log(state.todos);
     let newTodos = state.todos;
      newTodos.map((todo) => {
        if (todo._id === updatedTodo._id) {
          todo = updatedTodo;
        }
      });
      state.todos = newTodos;
      console.log(state.todos);
    });
    builder.addCase(editTodo.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.message;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { toggleEdit } = todosSlice.actions;
export default todosSlice.reducer;
