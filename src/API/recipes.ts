import axios, { AxiosResponse } from "axios";
import {
  URL_FROM_RECIPE_TO_SHOP_LIST,
  URL_INGREDIENT_BY_ID,
  URL_RECIPES,
  URL_RECIPES_BY_TAG_ID,
  URL_RECIPE_BY_ID,
  URL_RECIPE_DELETE_INSTRUCTION_PHOTO,
  URL_RECIPE_INSTRUCTION_PHOTO,
  URL_RECIPE_MAIN_PHOTO,
  URL_RECIPE_MAIN_PHOTO_FROM_INSTRUCTION,
} from "../utils/constants";
import { Ingredient, RecipeResponse, Tag } from "../types/types";

export async function getRecipesByTagId(tagId: number, token: string) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: URL_RECIPES_BY_TAG_ID(tagId),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then((response) => response.data.data.allRecipesByTag)
    .catch((error) => error);
}

export async function createRecipe(
  name: string,
  token: string,
  tagId?: number
) {
  const data =
    tagId === undefined
      ? JSON.stringify({
          name,
        })
      : JSON.stringify({
          name,
          tagDTOs: [
            {
              id: tagId,
            },
          ],
        });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: URL_RECIPES,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return axios
    .request(config)
    .then((response) => response)
    .catch((error) => error);
}

export async function updateRecipeName(
  name: string,
  recipeId: number,
  token: string
) {
  const data = JSON.stringify({
    name,
  });

  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: URL_RECIPE_BY_ID(recipeId),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return axios
    .request(config)
    .then((response) => response)
    .catch((error) => error);
}

export async function deleteRecipe(recipeId: number, token: string) {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: URL_RECIPE_BY_ID(recipeId),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.request(config).catch((error) => error.message);
}

export async function updateRecipeMainPhoto(
  token: string,
  data: FormData,
  recipeId: number
) {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: URL_RECIPE_MAIN_PHOTO(recipeId),
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return axios
    .request(config)
    .then((response) => response.data.message)
    .catch((error) => error.message);
}

export async function getRecipeByRecipeId(token: string, recipeId: number) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: URL_RECIPE_BY_ID(recipeId),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then(
      (response: AxiosResponse<RecipeResponse>) => response.data.data.recipeDTO
    )
    .catch((error) => error.message);
}

export async function updateRecipePhoto(
  data: FormData,
  recipeId: number,
  token: string
) {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: URL_RECIPE_INSTRUCTION_PHOTO(recipeId),
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return axios
    .request(config)
    .then((response) => response.data.message)
    .catch((error) => error.message);
}

export interface UpdateRecipeInfoArgs {
  name: string;
  tagDTOs?: Tag[];
  ingredientDTOs?: Ingredient[];
  instructions?: string;
  links?: string[];
}

export async function updateRecipeInfo(
  data: UpdateRecipeInfoArgs,
  recipeId: number,
  token: string
) {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: URL_RECIPE_BY_ID(recipeId),
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return axios
    .request(config)
    .then((response) => response.data.message)
    .catch((error) => error.message);
}

export async function updateRecipeMainPhotoFromInstruction(
  recipeId: number,
  instructionPhotoSeqNo: number,
  token: string
) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: URL_RECIPE_MAIN_PHOTO_FROM_INSTRUCTION(
      recipeId,
      instructionPhotoSeqNo
    ),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then((response) => response.data.message)
    .catch((error) => error.message);
}

export async function updateIngredient(
  ingredientId: number,
  updatedIngredientInfo: Ingredient,
  token: string
) {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: URL_INGREDIENT_BY_ID(ingredientId),
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: updatedIngredientInfo,
  };

  return axios
    .request(config)
    .then((response) => response.data.message)
    .catch((error) => error.message);
}

export async function addIngredientFromRecipeToShopList(
  ingredientId: number,
  recipeId: number,
  token: string
) {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: URL_FROM_RECIPE_TO_SHOP_LIST(recipeId, ingredientId),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then((response) => response.data.message)
    .catch((error) => error.message);
}

export async function deleteIngredient(ingredientId: number, token: string) {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: URL_INGREDIENT_BY_ID(ingredientId),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then((response) => response.data.message)
    .catch((error) => error.message);
}

export async function deleteInstructionPhoto(
  recipeId: number,
  instructionPhotoSeqNo: number,
  token: string
) {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: URL_RECIPE_DELETE_INSTRUCTION_PHOTO(recipeId, instructionPhotoSeqNo),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then((response) => response.data.message)
    .catch((error) => error.message);
}

export async function getAllRecipes(token: string) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: URL_RECIPES,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then((response) => response.data.data.allRecipesDTOs)
    .catch((error) => error.message);
}
