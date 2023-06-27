import axios, { AxiosResponse } from "axios";
import { URL_TAGS } from "../utils/constants";
import { TagsResponse } from "../types/types";

export default async function getTags(token: string) {
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
