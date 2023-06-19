import axios from "axios";
import { URL_USER_PASSWORD } from "../utils/constants";

export default async function checkUserPassword(
  token: string,
  password: number | string
) {
  const dataBody = JSON.stringify({
    password,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: URL_USER_PASSWORD,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: dataBody,
  };

  return axios
    .request(config)
    .then((resp) => resp.data.data.matches)
    .catch((error) => {
      throw new Error(error);
    });
}
