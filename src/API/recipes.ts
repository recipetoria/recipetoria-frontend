import axios, { AxiosResponse } from "axios";
import {
  URL_RECIPES,
  URL_RECIPES_BY_TAG_ID,
  URL_RECIPE_BY_ID,
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

export async function createRecipe(name: string, tagId: number, token: string) {
  const data = JSON.stringify({
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
