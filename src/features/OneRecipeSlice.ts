/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../types/types";
import { getRecipeByRecipeId } from "../API/recipes";

export const fetchRecipeByRecipeId = createAsyncThunk(
  "recipe/fetchRecipeByRecipeId",
  async ({ recipeId, token }: { recipeId: number; token: string }) =>
    getRecipeByRecipeId(token, recipeId)
);

interface RecipeSliceValues {
  value: Recipe;
  isLoading: boolean;
  error: string | undefined | null;
}

const OneRecipeSlice = createSlice({
  name: "recipe",
  initialState: <RecipeSliceValues>{
    value: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    oneRecipeValue: (state, action: PayloadAction<Recipe>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipeByRecipeId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchRecipeByRecipeId.fulfilled,
      (state, action: PayloadAction<Recipe>) => {
        state.isLoading = false;
        state.value = action.payload;
      }
    );
    builder.addCase(fetchRecipeByRecipeId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { oneRecipeValue } = OneRecipeSlice.actions;

export default OneRecipeSlice.reducer;
