import axios from "axios";
import { URL_UPDATE_NAME_AND_EMAIL } from "../utils/constants";
import { updateAuthRegister } from "../utils/storage";

export default function updateUserName(name: string, token: string) {
  const data = JSON.stringify({ name });

  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: URL_UPDATE_NAME_AND_EMAIL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  axios
    .request(config)
    .then(() => {
      updateAuthRegister(token, true);
    })
    .catch((error) => {
      throw new Error(error);
    });
}
