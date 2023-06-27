import axios, { AxiosResponse } from "axios";
import { URL_TAGS, URL_TAG_BY_ID } from "../utils/constants";
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

export async function deleteTag(token: string, tagId: number) {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: URL_TAG_BY_ID(tagId),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios.request(config).catch((error) => error.message);
}

export async function updateTagName(token: string, data: Tag, tagId: number) {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: URL_TAG_BY_ID(tagId),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  axios
    .request(config)
    .then((response) => response.data.message)
    .catch((error) => error.message);
}
