import { AxiosResponse } from "axios";
import { SignResponse } from "../types/types";

export default function setRegister(
  response: AxiosResponse<SignResponse>,
  name: string
) {
  localStorage.setItem(
    "authRegister",
    JSON.stringify({
      name,
      token: response.data.data.authenticationResponse.token,
      isAuth: true,
    })
  );
}
