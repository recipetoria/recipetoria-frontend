import axios from "axios";
import {
  URL_RECIPES,
  URL_RECIPES_BY_TAG_ID,
  URL_RECIPE_BY_ID,
  URL_RECIPE_MAIN_PHOTO,
} from "../utils/constants";

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
