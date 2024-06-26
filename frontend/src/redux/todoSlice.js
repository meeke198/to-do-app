
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://be-todo-h20h.onrender.com/api/tasks";

// const URI = "https://be-todo-h20h.onrender.com/api/tasks";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(url)
  return response.data.data;
});

export const fetchTodo = createAsyncThunk("todos/fetchTodo", async (id) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
});

export const createTodo = createAsyncThunk("todos/createTodo", async (newTodo) => {
  const response = await axios.post(url, newTodo);
  return response.data;
});

export const editTodo = createAsyncThunk("todos/editTodo", async (updatedTodo) => {
  const response = await axios.put(`${url}/${updatedTodo._id}`, updatedTodo);
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
    loading: false,
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
    builder.addCase(createTodo.fulfilled, (state, action) => {
      // console.log(action.payload)
      state.todos.push(action.payload);
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.message;
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
    const updatedTodo = action.payload;
    state.todos = state.todos.map((todo) =>
      todo._id === updatedTodo.id ? updatedTodo : todo
    );
    state.completedTodos = state.completedTodos.map((todo) =>
      todo._id === updatedTodo.id ? updatedTodo : todo
     );
    });
    builder.addCase(editTodo.rejected, (state, action) => {
      // console.log(action.payload);
      state.error = action.error.message;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const deletedTodoId = action.payload;
      state.todos = state.todos.filter((todo) => todo._id !== deletedTodoId);
      state.completedTodos = state.completedTodos.filter(
        (todo) => todo._id !== deletedTodoId
      );
    });
  },
});

export const { toggleEdit } = todosSlice.actions;
export default todosSlice.reducer;
