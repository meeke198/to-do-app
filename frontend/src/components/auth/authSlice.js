import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
// const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
// const apiUrl = "https://be-todo-h20h.onrender.com/api/tasks";
const url = "http://localhost:5001";
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};
// export const loginAction = async (data) => {
//   try {
//     const response = await fetch("your-api-endpoint/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },`
//       body: JSON.stringify(data),
//     });
//     const res = await response.json();
//     if (res.data) {
//       setUser(res.data.user);
//       setToken(res.token);
//       localStorage.setItem("site", res.token);

//     }
//     throw new Error(res.message);
//   } catch (err) {
//     console.error(err);
//   }
// };
export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const response = await axios.post(`${url}/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    console.log({response});
    const res = await response.data;
    console.log({ res });
    const token = res.token;
    localStorage.setItem("token", token.slice(7));
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // loginAction(state, action) {
    //   state.isEdit = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
       console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
       console.log(action.payload);
      state.error = action.payload;
    });

  },
});

export default authSlice.reducer;
