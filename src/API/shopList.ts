import axios from "axios";
import { URL_INGREDIENT } from "../utils/constants";
import { Ingredient } from "../types/types";

export async function getShoppingList(token: string) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: URL_INGREDIENT,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then((response) => response.data.data.allIngredientDTOs)
    .catch((error) => error);
}

export async function cleanShopList(token: string) {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: URL_INGREDIENT,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.request(config).catch((error) => error.message);
}

export async function createNewIngredient(token: string, data: Ingredient) {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: URL_INGREDIENT,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return axios
    .request(config)
    .then((response) => response)
    .catch((error) => error);
}
