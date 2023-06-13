/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const IsOpenProfileModalSlice = createSlice({
  name: "isOpenProfileModal",
  initialState: {
    value: false,
  },
  reducers: {
    isOpenProfileValue: (state) => {
      state.value = !state.value;
    },
  },
});

export const { isOpenProfileValue } = IsOpenProfileModalSlice.actions;

export default IsOpenProfileModalSlice.reducer;
