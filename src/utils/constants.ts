export const BASE_URL = "http://localhost:8080/api/v1/";
export const URL_REGISTER = `${BASE_URL}auth/register`;
export const URL_CLIENT = `${BASE_URL}client`;

export const TOKEN = JSON.parse(
  localStorage.getItem("authRegister") || ""
).token;
export const AUTHORIZATION = `Bearer ${TOKEN}`;
