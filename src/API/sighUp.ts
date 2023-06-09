import axios, { AxiosError, AxiosResponse } from "axios";
import { SignResponse } from "../types/types";
import { URL_REGISTER } from "../utils/constants";
import setRegister from "../utils/storage";

export default async function signUp(
  name: string,
  email: string,
  password: string
) {
  const data = JSON.stringify({
    name,
    email,
    password,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: URL_REGISTER,
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
    resp = (err.response as AxiosResponse<SignResponse>).data.message;
  }

  return resp;
}
