/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICategoriesStyleInitialValue {
  style: {
    height: number;
  };
}

const CategoriesStyleSlice = createSlice({
  name: "categoriesStyle",
  initialState: <ICategoriesStyleInitialValue>{
    style: {
      height: 100,
    },
  },
  reducers: {
    categoriesStyleValue: (
      state,
      action: PayloadAction<ICategoriesStyleInitialValue>
    ) => {
      state.style = action.payload.style;
    },
  },
});

export const { categoriesStyleValue } = CategoriesStyleSlice.actions;

export default CategoriesStyleSlice.reducer;
