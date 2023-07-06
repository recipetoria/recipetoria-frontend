import axios from "axios";
import { URL_RECIPES_BY_TAG_ID } from "../utils/constants";

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
    url: "http://localhost:8080/api/v1/client/recipes",
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
