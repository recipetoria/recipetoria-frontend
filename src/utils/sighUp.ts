import axios, { AxiosResponse } from "axios";
import { SignUpResponseMessage } from "../types/types";

interface SignUpResponse {
  timeStamp: string;
  statusCode: number;
  message: SignUpResponseMessage;
  data: {
    authenticationResponse: {
      token: string;
    };
  };
}

export const BASE_URL = "http://localhost:8080/api/v1/";
export const URL_REGISTER = `${BASE_URL}auth/register`;

export function signUp(name: string, email: string, password: string) {
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

  let responseMessage: SignUpResponseMessage = "User registered successfully";

  axios
    .request(config)
    .then((response: AxiosResponse<SignUpResponse>) => {
      localStorage.setItem(
        "authRegister",
        JSON.stringify({
          name,
          token: response.data.data.authenticationResponse,
        })
      );
      responseMessage = response.data.message;
    })
    .catch((error) => {
      responseMessage = error.message;
      throw new Error(error.message);
    });

  return responseMessage;
}
