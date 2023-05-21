/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const SnackbarTextSlice = createSlice({
  name: "SnackbarTextSlice",
  initialState: {
    value: "",
  },
  reducers: {
    SnackbarTextValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { SnackbarTextValue } = SnackbarTextSlice.actions;

export default SnackbarTextSlice.reducer;
