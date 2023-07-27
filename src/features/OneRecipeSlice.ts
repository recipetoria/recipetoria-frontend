/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../types/types";
import {
  getRecipeByRecipeId,
  updateRecipeInfo,
  UpdateRecipeInfoArgs,
  updateRecipeMainPhotoFromInstruction,
  updateRecipePhoto,
} from "../API/recipes";

interface ArgsFetchRecipeValues {
  recipeId: number;
  token: string;
  data?: FormData;
  infoRecipeData?: UpdateRecipeInfoArgs;
}

export const fetchRecipeByRecipeId = createAsyncThunk(
  "recipe/fetchRecipeByRecipeId",
  async ({ recipeId, token }: ArgsFetchRecipeValues) =>
    getRecipeByRecipeId(token, recipeId)
);

export const fetchAddRecipePhoto = createAsyncThunk(
  "recipe/fetchAddRecipePhoto",
  async ({ recipeId, token, data }: ArgsFetchRecipeValues, { dispatch }) => {
    if (data) {
      await updateRecipePhoto(data, recipeId, token);
      dispatch(fetchRecipeByRecipeId({ recipeId, token }));
    } else {
      throw new Error(`Custom error: data is not defined. Data: ${data}`);
    }
  }
);

export const fetchUpdateRecipeInfo = createAsyncThunk(
  "recipe/fetchUpdateRecipeInfo",
  async (
    { infoRecipeData, recipeId, token }: ArgsFetchRecipeValues,
    { dispatch }
  ) => {
    if (infoRecipeData?.name) {
      await updateRecipeInfo(infoRecipeData, recipeId, token);
      dispatch(fetchRecipeByRecipeId({ recipeId, token }));
    } else {
      throw new Error(
        `Custom error: infoRecipeData.name is not defined. infoRecipeData: ${infoRecipeData}`
      );
    }
  }
);

export const fetchUpdateRecipeMainPhotoFromInstruction = createAsyncThunk(
  "recipes/fetchUpdateRecipeMainPhotoFromInstruction",
  async (
    {
      instructionPhotoSeqNo,
      recipeId,
      token,
    }: { instructionPhotoSeqNo: number; recipeId: number; token: string },
    { dispatch }
  ) => {
    await updateRecipeMainPhotoFromInstruction(
      recipeId,
      instructionPhotoSeqNo,
      token
    );
    dispatch(fetchRecipeByRecipeId({ recipeId, token }));
  }
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
