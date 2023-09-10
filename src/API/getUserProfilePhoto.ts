import axios from "axios";
import { URL_USER_PROFILE_PHOTO } from "../utils/constants";

export default async function getUserProfilePhoto(token: string) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: URL_USER_PROFILE_PHOTO,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = axios.request(config);
  const { data } = await res;
  return data;
}
