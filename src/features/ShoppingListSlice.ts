/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../types/types";
import {
  cleanShopList,
  createNewIngredient,
  getShoppingList,
} from "../API/shopList";
import { deleteIngredient, updateIngredient } from "../API/recipes";

interface ArgsFetchShopListValues {
  token: string;
  ingredientId?: number;
  updatedIngredientInfo?: Ingredient;
  data?: Ingredient;
}

export const fetchShopList = createAsyncThunk(
  "shopList/fetchRecipeByRecipeId",
  async ({ token }: ArgsFetchShopListValues) => getShoppingList(token)
);

export const fetchCleanShoppingList = createAsyncThunk(
  "shopList/fetchCleanShoppingList",
  async ({ token }: ArgsFetchShopListValues, { dispatch }) => {
    await cleanShopList(token);
    dispatch(fetchShopList({ token }));
  }
);

export const fetchUpdateIngredientFromShopList = createAsyncThunk(
  "shopList/fetchUpdateIngredientFromShopList",
  async (
    { token, ingredientId, updatedIngredientInfo }: ArgsFetchShopListValues,
    { dispatch }
  ) => {
    if (ingredientId && updatedIngredientInfo) {
      await updateIngredient(ingredientId, updatedIngredientInfo, token);
      dispatch(fetchShopList({ token }));
    } else {
      throw new Error(
        `Custom Error: Something went wrong width ingredientId: ${ingredientId} or updatedIngredientInfo: ${updatedIngredientInfo}`
      );
    }
  }
);

export const fetchCreateNewIngredient = createAsyncThunk(
  "shopList/fetchCreateNewIngredient",
  async ({ token, data }: ArgsFetchShopListValues, { dispatch }) => {
    if (data) {
      await createNewIngredient(token, data);
      dispatch(fetchShopList({ token }));
    } else {
      throw new Error(`Custom Error: Something went wrong width data: ${data}`);
    }
  }
);

export const fetchDeleteIngredientFromShopList = createAsyncThunk(
  "shopList/fetchDeleteIngredientFromShopList",
  async ({ token, ingredientId }: ArgsFetchShopListValues, { dispatch }) => {
    if (ingredientId) {
      await deleteIngredient(ingredientId, token);
      dispatch(fetchShopList({ token }));
    } else {
      throw new Error(
        `Custom Error: Something went wrong width ingredientId: ${ingredientId}`
      );
    }
  }
);

interface ShopListSliceValues {
  value: Ingredient[];
  isLoading: boolean;
  error: string | undefined | null;
}

const ShoppingListSlice = createSlice({
  name: "shopList",
  initialState: <ShopListSliceValues>{
    value: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    shoppingListValue: (state, action: PayloadAction<Ingredient[]>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShopList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchShopList.fulfilled,
      (state, action: PayloadAction<Ingredient[]>) => {
        state.isLoading = false;
        state.value = action.payload;
      }
    );
    builder.addCase(fetchShopList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { shoppingListValue } = ShoppingListSlice.actions;

export default ShoppingListSlice.reducer;
