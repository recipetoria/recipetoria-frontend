/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "isAuth",
  initialState: {
    value: localStorage.getItem("authRegister")
      ? !!JSON.parse(localStorage.getItem("authRegister") || "").isAuth
      : false,
  },
  reducers: {
    isAuthValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { isAuthValue } = AuthSlice.actions;

export default AuthSlice.reducer;
