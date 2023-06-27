import axios, { AxiosResponse } from "axios";
import { URL_TAGS } from "../utils/constants";
import { Tag, TagsResponse } from "../types/types";

export async function getTags(token: string) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: URL_TAGS,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then(
      (response: AxiosResponse<TagsResponse>) => response.data.data.allTagsDTOs
    )
    .catch((error) => error.message);
}

export async function createTag(token: string, data: Tag) {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: URL_TAGS,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  axios
    .request(config)
    .then((response) => response.data)
    .catch((error) => error.message);
}
