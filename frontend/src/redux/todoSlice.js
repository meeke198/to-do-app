import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://be-todo-h20h.onrender.com/api/tasks";
const url = apiUrl;

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(url);

  return response.data.data;
});

export const fetchTodo = createAsyncThunk("todos/fetchTodo", async (id) => {
  const response = await axios.get(`${url}/${id}`);

  return response.data;
});

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (newTodo) => {
    const response = await axios.post(url, newTodo);

    return response.data;
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (updatedTodo) => {
    const response = await axios.put(`${url}/${updatedTodo._id}`, updatedTodo);

    return response.data;
  }
);

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
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { toggleEdit } = todosSlice.actions;
export default todosSlice.reducer;
