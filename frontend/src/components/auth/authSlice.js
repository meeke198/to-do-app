import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "axios";
const url = "http://localhost:5001";
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};
export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const response = await axiosInstance.post(`${url}/login`, user);
    const res = response.data;
    localStorage.setItem("token", res.token.slice(7));
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
export const signup = createAsyncThunk("auth/signup", async (user) => {
  try {
    const response = await axiosInstance.post(`${url}/signup`, user);
    const res = response.data;
    localStorage.setItem("token", res.token.slice(7));
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
