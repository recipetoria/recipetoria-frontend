import axios, { AxiosResponse, AxiosError } from "axios";
import { PARSED_NAME, URL_AUTHENTICATE } from "./constants";
import { SignResponse } from "../types/types";

export default async function signIn(email: string, password: string) {
  const data = JSON.stringify({
    email,
    password,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: URL_AUTHENTICATE,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  let resp;
  try {
    resp = await axios
      .request(config)
      .then((response: AxiosResponse<SignResponse>) => {
        localStorage.setItem(
          "authRegister",
          JSON.stringify({
            name: PARSED_NAME,
            token: response.data.data.authenticationResponse.token,
          })
        );
        return response.status;
      });
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.message);
  }

  return resp;
}
