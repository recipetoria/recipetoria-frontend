/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SnackbarValues {
  text: string;
  withUndo: boolean;
}

const SnackbarTextSlice = createSlice({
  name: "SnackbarTextSlice",
  initialState: {
    value: <SnackbarValues>{
      text: "",
      withUndo: false,
    },
  },
  reducers: {
    SnackbarTextValue: (state, action: PayloadAction<SnackbarValues>) => {
      state.value = action.payload;
    },
  },
});

export const { SnackbarTextValue } = SnackbarTextSlice.actions;

export default SnackbarTextSlice.reducer;
