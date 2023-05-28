/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAuth {
  name: string;
  token: string;
  isAuth: boolean;
}

const AuthSlice = createSlice({
  name: "authData",
  initialState: {
    value: <IAuth>{
      name: localStorage.getItem("authRegister")
        ? JSON.parse(localStorage.getItem("authRegister") || "").name
        : "",
      token: localStorage.getItem("authRegister")
        ? JSON.parse(localStorage.getItem("authRegister") || "").token
        : "",
      isAuth: localStorage.getItem("authRegister")
        ? !!JSON.parse(localStorage.getItem("authRegister") || "").isAuth
        : false,
    },
  },
  reducers: {
    isAuthValue: (state, action: PayloadAction<IAuth>) => {
      state.value = action.payload;
    },
  },
});

export const { isAuthValue } = AuthSlice.actions;

export default AuthSlice.reducer;
