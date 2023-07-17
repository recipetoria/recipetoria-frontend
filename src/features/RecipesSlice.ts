/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRecipe,
  deleteRecipe,
  getRecipesByTagId,
  updateRecipeMainPhoto,
  updateRecipeName,
} from "../API/recipes";
import { Recipe, Tag } from "../types/types";

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

export const fetchUpdateRecipeName = createAsyncThunk(
  "recipes/fetchUpdateRecipeName",
  async (
    {
      name,
      tagId,
      recipeId,
      token,
    }: { name: string; tagId: number | Tag[]; recipeId: number; token: string },
    { dispatch }
  ) => {
    await updateRecipeName(name, recipeId, token);
    if (typeof tagId === "number") {
      dispatch(fetchRecipesByTagId({ tagId, token }));
    } else {
      tagId.map((item) => {
        console.log(name, tagId, item.id, recipeId, token);

        dispatch(fetchRecipesByTagId({ tagId: item.id, token }));
        return true;
      });
    }
  }
);

export const fetchDeleteRecipe = createAsyncThunk(
  "recipes/fetchDeleteRecipe",
  async (
    {
      tagId,
      recipeId,
      token,
    }: { tagId: number; recipeId: number; token: string },
    { dispatch }
  ) => {
    await deleteRecipe(recipeId, token);
    dispatch(fetchRecipesByTagId({ tagId, token }));
  }
);

export const fetchUpdateRecipeMainPhoto = createAsyncThunk(
  "recipes/fetchUpdateRecipeMainPhoto",
  async (
    {
      data,
      tagId,
      recipeId,
      token,
    }: { data: FormData; tagId: number; recipeId: number; token: string },
    { dispatch }
  ) => {
    await updateRecipeMainPhoto(token, data, recipeId);
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
