import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../redux/todoSlice";
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
