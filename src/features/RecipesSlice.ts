/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  updateRecipeMainPhoto,
  updateRecipeName,
} from "../API/recipes";
import { Recipe } from "../types/types";
import { fetchRecipeByRecipeId } from "./OneRecipeSlice";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (token: string) => getAllRecipes(token)
);

export const fetchCreateNewRecipe = createAsyncThunk(
  "recipes/fetchCreateNewRecipe",
  async (
    { name, tagId, token }: { name: string; tagId?: number; token: string },
    { dispatch }
  ) => {
    await createRecipe(name, token, tagId);
    dispatch(fetchRecipes(token));
  }
);

export const fetchUpdateRecipeName = createAsyncThunk(
  "recipes/fetchUpdateRecipeName",
  async (
    {
      name,
      recipeId,
      token,
    }: { name: string; recipeId: number; token: string },
    { dispatch }
  ) => {
    await updateRecipeName(name, recipeId, token);
    dispatch(fetchRecipes(token));
  }
);

export const fetchDeleteRecipe = createAsyncThunk(
  "recipes/fetchDeleteRecipe",
  async (
    { recipeId, token }: { recipeId: number; token: string },
    { dispatch }
  ) => {
    await deleteRecipe(recipeId, token);
    dispatch(fetchRecipes(token));
  }
);

export const fetchUpdateRecipeMainPhoto = createAsyncThunk(
  "recipes/fetchUpdateRecipeMainPhoto",
  async (
    {
      data,
      recipeId,
      token,
    }: { data: FormData; recipeId: number; token: string },
    { dispatch }
  ) => {
    await updateRecipeMainPhoto(token, data, recipeId);
    dispatch(fetchRecipes(token));
    dispatch(fetchRecipeByRecipeId({ recipeId, token }));
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
    builder.addCase(fetchRecipes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchRecipes.fulfilled,
      (state, action: PayloadAction<Recipe[]>) => {
        state.isLoading = false;
        state.value = action.payload;
      }
    );
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { recipesValue } = RecipesSlice.actions;

export default RecipesSlice.reducer;
