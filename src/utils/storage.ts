import { AxiosError } from "axios";
import getUserInfo from "../API/getUserInfo";

export default function setRegister(
  token: string,
  name: string,
  isAuth: boolean
) {
  localStorage.setItem(
    "authRegister",
    JSON.stringify({
      name,
      token,
      isAuth,
    })
  );
}

export function updateAuthRegister(token: string, isAuth: boolean) {
  try {
    getUserInfo(token).then((value) => setRegister(token, value.name, isAuth));
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
}
