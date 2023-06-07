import axios from "axios";
import { URL_UPDATE_USER_PROFILE_PHOTO } from "../utils/constants";

export default function updateUserProfilePhoto(data: FormData, token: string) {
  const config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: URL_UPDATE_USER_PROFILE_PHOTO,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
}
