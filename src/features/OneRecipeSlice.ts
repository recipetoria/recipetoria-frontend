/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient, Recipe } from "../types/types";
import {
  addIngredientFromRecipeToShopList,
  deleteIngredient,
  deleteInstructionPhoto,
  getRecipeByRecipeId,
  updateIngredient,
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
  ingredientId?: number;
  updatedIngredientInfo?: Ingredient;
  instructionPhotoSeqNo?: number;
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
  "recipe/fetchUpdateRecipeMainPhotoFromInstruction",
  async (
    { instructionPhotoSeqNo, recipeId, token }: ArgsFetchRecipeValues,
    { dispatch }
  ) => {
    if (instructionPhotoSeqNo !== undefined) {
      await updateRecipeMainPhotoFromInstruction(
        recipeId,
        instructionPhotoSeqNo,
        token
      );
      dispatch(fetchRecipeByRecipeId({ recipeId, token }));
    } else {
      throw new Error(
        `Custom Error: Something went wrong width instructionPhotoSeqNo: ${instructionPhotoSeqNo}`
      );
    }
  }
);

export const fetchUpdateIngredient = createAsyncThunk(
  "recipe/fetchUpdateIngredient",
  async (
    {
      recipeId,
      token,
      ingredientId,
      updatedIngredientInfo,
    }: ArgsFetchRecipeValues,
    { dispatch }
  ) => {
    if (ingredientId && updatedIngredientInfo) {
      await updateIngredient(ingredientId, updatedIngredientInfo, token);
      dispatch(fetchRecipeByRecipeId({ recipeId, token }));
    } else {
      throw new Error(
        `Custom Error: Something went wrong width ingredientId: ${ingredientId} or updatedIngredientInfo: ${updatedIngredientInfo}`
      );
    }
  }
);

export const fetchAddIngredientFromRecipeToShopList = createAsyncThunk(
  "recipe/fetchAddIngredientFromRecipeToShopList",
  async (
    { recipeId, token, ingredientId }: ArgsFetchRecipeValues,
    { dispatch }
  ) => {
    if (ingredientId) {
      await addIngredientFromRecipeToShopList(ingredientId, recipeId, token);
      dispatch(fetchRecipeByRecipeId({ recipeId, token }));
    } else {
      throw new Error(
        `Custom Error: Something went wrong width ingredientId: ${ingredientId}`
      );
    }
  }
);

export const fetchDeleteIngredient = createAsyncThunk(
  "recipe/fetchDeleteIngredient",
  async (
    { recipeId, token, ingredientId }: ArgsFetchRecipeValues,
    { dispatch }
  ) => {
    if (ingredientId) {
      await deleteIngredient(ingredientId, token);
      dispatch(fetchRecipeByRecipeId({ recipeId, token }));
    } else {
      throw new Error(
        `Custom Error: Something went wrong width ingredientId: ${ingredientId}`
      );
    }
  }
);

export const fetchDeleteInstructionPhoto = createAsyncThunk(
  "recipe/fetchDeleteInstructionPhoto",
  async (
    { recipeId, instructionPhotoSeqNo, token }: ArgsFetchRecipeValues,
    { dispatch }
  ) => {
    if (instructionPhotoSeqNo !== undefined) {
      await deleteInstructionPhoto(recipeId, instructionPhotoSeqNo, token);
      dispatch(fetchRecipeByRecipeId({ recipeId, token }));
    } else {
      throw new Error(
        `Custom Error: Something went wrong width instructionPhotoSeqNo: ${instructionPhotoSeqNo}`
      );
    }
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
