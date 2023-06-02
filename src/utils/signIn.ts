import axios, { AxiosResponse, AxiosError } from "axios";
import { URL_AUTHENTICATE } from "./constants";
import { SignResponse } from "../types/types";
import setRegister from "./storage";

export default async function signIn(
  email: string,
  password: string,
  name: string
) {
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
        setRegister(
          response.data.data.authenticationResponse.token,
          name,
          true
        );
        return response.status;
      });
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.message);
  }

  return resp;
}
