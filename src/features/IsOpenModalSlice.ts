/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type OpenMode = "none" | "afterRegister";

interface InitialValues {
  value: boolean;
  mode: OpenMode;
}

const IsOpenModalSlice = createSlice({
  name: "IsOpenModalSlice",
  initialState: <InitialValues>{
    value: false,
    mode: "none",
  },
  reducers: {
    isOpenModalValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    isOpenModalMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { isOpenModalValue, isOpenModalMode } = IsOpenModalSlice.actions;

export default IsOpenModalSlice.reducer;
