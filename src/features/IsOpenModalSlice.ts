/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const IsOpenModalSlice = createSlice({
  name: "IsOpenModalSlice",
  initialState: {
    value: false,
  },
  reducers: {
    isOpenModalValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { isOpenModalValue } = IsOpenModalSlice.actions;

export default IsOpenModalSlice.reducer;
