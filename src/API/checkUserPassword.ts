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
    method: "get",
    maxBodyLength: Infinity,
    url: URL_USER_PASSWORD,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: dataBody,
  };

  axios
    .request(config)
    .then((resp) => console.log(resp))
    .catch((error) => console.log(error));
}
