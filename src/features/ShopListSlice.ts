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
    updateShopElement: (state, action: PayloadAction<IShoppingListItems>) => {
      const index = state.value.findIndex(
        (element) => element.id === action.payload.id
      );
      const newArray = [...state.value];
      newArray[index].name = action.payload.name;
      newArray[index].amount = action.payload.amount;
      newArray[index].measure = action.payload.measure;
      state.value = newArray;
    },
    addNewShopElement: (state, action: PayloadAction<IShoppingListItems>) => {
      const newArray = [
        ...state.value,
        <IShoppingListItems>{
          id: action.payload.id,
          name: action.payload.name,
          amount: action.payload.amount,
          measure: action.payload.measure,
        },
      ];
      state.value = newArray;
    },
    removeShopElement: (state, action: PayloadAction<IShoppingListItems>) => {
      const index = state.value.findIndex(
        (element) => element.id === action.payload.id
      );
      const newArray = [...state.value];
      newArray.splice(index, 1);
      state.value = newArray;
    },
    cleanShopList: (state) => {
      state.value = [];
    },
  },
});

export const {
  shopListValue,
  updateShopElement,
  addNewShopElement,
  removeShopElement,
  cleanShopList,
} = ShopListSlice.actions;

export default ShopListSlice.reducer;
