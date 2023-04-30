/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const ShopListNewStringSlice = createSlice({
  name: "shopListNewStringSlice",
  initialState: {
    value: false,
  },
  reducers: {
    shopListNewStringValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { shopListNewStringValue } = ShopListNewStringSlice.actions;

export default ShopListNewStringSlice.reducer;
