import axios from "axios";
import { URL_USER_PROFILE_PHOTO } from "../utils/constants";

export default async function updateUserProfilePhoto(
  dataBody: FormData,
  token: string
) {
  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: URL_USER_PROFILE_PHOTO,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: dataBody,
  };

  const res = axios.request(config);
  const { data } = await res;
  return data;
}
