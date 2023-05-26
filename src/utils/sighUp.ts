import axios, { AxiosResponse } from "axios";
import { SignUpResponseMessage } from "../types/types";
import { URL_REGISTER } from "./constants";

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

export default function signUp(name: string, email: string, password: string) {
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
          token: response.data.data.authenticationResponse.token,
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
