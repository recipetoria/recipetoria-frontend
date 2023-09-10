import axios from "axios";
import { URL_USER_PASSWORD } from "../utils/constants";

export default function updateUserPassword(password: string, token: string) {
  const data = JSON.stringify({ password });

  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: URL_USER_PASSWORD,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return axios
    .request(config)
    .then((response) => response.data.statusCode)
    .catch((error) => {
      throw new Error(error);
    });
}
