/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IShoppingListItems } from "../types/types";
import shopListData from "../assets/data/shopListData";

const ShopListSlice = createSlice({
  name: "shopList",
  initialState: {
    value: <IShoppingListItems[]>[...shopListData],
  },
  reducers: {
    shopListValue: (state, action: PayloadAction<IShoppingListItems[]>) => {
      state.value = action.payload;
    },
  },
});

export const { shopListValue } = ShopListSlice.actions;

export default ShopListSlice.reducer;
