import axios, { AxiosResponse, AxiosError } from "axios";
import { URL_AUTHENTICATE } from "../utils/constants";
import { SignResponse } from "../types/types";
import setRegister from "../utils/storage";
import getUserInfo from "./getUserInfo";

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
      .then((response: AxiosResponse<SignResponse>) =>
        getUserInfo(response.data.data.authenticationResponse.token)
          .then((userInfoResponse) => {
            setRegister(
              response.data.data.authenticationResponse.token,
              userInfoResponse.name,
              true
            );
            return response.status;
          })
          .catch((err) => err.message)
      );
  } catch (error) {
    const err = error as AxiosError;
    resp = (err.response as AxiosResponse<SignResponse>).data.message;
  }

  return resp;
}
