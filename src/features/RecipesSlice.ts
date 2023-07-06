/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRecipe, getRecipesByTagId } from "../API/recipes";
import { Recipe } from "../types/types";

export const fetchRecipesByTagId = createAsyncThunk(
  "recipes/fetchRecipesByTagId",
  async ({ tagId, token }: { tagId: number; token: string }) =>
    getRecipesByTagId(tagId, token)
);

export const fetchCreateNewRecipe = createAsyncThunk(
  "recipes/fetchCreateNewRecipe",
  async (
    { name, tagId, token }: { name: string; tagId: number; token: string },
    { dispatch }
  ) => {
    await createRecipe(name, tagId, token);
    dispatch(fetchRecipesByTagId({ tagId, token }));
  }
);

interface RecipesSliceValues {
  value: Recipe[];
  isLoading: boolean;
  error: string | undefined | null;
}

const RecipesSlice = createSlice({
  name: "recipes",
  initialState: <RecipesSliceValues>{
    value: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    recipesValue: (state, action: PayloadAction<Recipe[]>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipesByTagId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchRecipesByTagId.fulfilled,
      (state, action: PayloadAction<Recipe[]>) => {
        state.isLoading = false;
        state.value = action.payload;
      }
    );
    builder.addCase(fetchRecipesByTagId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { recipesValue } = RecipesSlice.actions;

export default RecipesSlice.reducer;
