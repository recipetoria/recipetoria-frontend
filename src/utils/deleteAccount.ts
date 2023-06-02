import axios from "axios";
import { URL_DELETE_ACCOUNT } from "./constants";
import setRegister from "./storage";

export default function deleteAccount(token: string) {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: URL_DELETE_ACCOUNT,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then(() => {
      setRegister("", "", false);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}
