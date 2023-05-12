/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IShoppingListItems } from "../types/types";

interface IFetchedValue {
  data: {
    allIngredientDTOs: IShoppingListItems[];
  };
}

const url = "https://recipetoria-production.up.railway.app/api/v1/client";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWNpcGV0b3JpYSIsInN1YiI6ImVtYWlsOEBtYWlsLmNvbSIsImlhdCI6MTY4MzgyMzY5NywiZXhwIjoxNjgzOTEwMDk3fQ.IXCNiUZAwOE2_wx1l5BB8dd9TAazGOIzWrCQhr2LBR4";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;
    return data;
  }
);

// export const addIngredient = createAsyncThunk(
//   "ingredients/addIngredient",
//   async (
//     { id, name, amount, measurementUnit }: IShoppingListItems,
//     { dispatch }
//   ) => {
//     console.log(id, name, amount, measurementUnit);
//     const res = await axios.post(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       data: {
//         id: 9,
//         name: "fee",
//         amount: 1,
//         measurementUnit: measurementUnit.toUpperCase(),
//       },
//     });
//     dispatch(
//       // eslint-disable-next-line @typescript-eslint/no-use-before-define
//       addNewShopElement({
//         id: 9,
//         name: "fee",
//         amount: 1,
//         measurementUnit: measurementUnit.toUpperCase(),
//       })
//     );
//   }
// );

const ShopListSlice = createSlice({
  name: "shopList",
  initialState: {
    value: <IShoppingListItems[]>[],
    isLoading: false,
    error: <string | undefined | null>null,
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
      newArray[index].measurementUnit = action.payload.measurementUnit;
      state.value = newArray;
    },
    addNewShopElement: (state, action: PayloadAction<IShoppingListItems>) => {
      const newArray = [
        ...state.value,
        <IShoppingListItems>{
          id: action.payload.id,
          name: action.payload.name,
          amount: action.payload.amount,
          measurementUnit: action.payload.measurementUnit,
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
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: PayloadAction<IFetchedValue>) => {
        state.isLoading = false;
        state.value = action.payload.data.allIngredientDTOs;
      }
    );
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
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
