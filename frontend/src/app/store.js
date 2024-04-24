import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../redux/todoSlice";
import authReducer from "../components/auth/authSlice";
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
  },
});
