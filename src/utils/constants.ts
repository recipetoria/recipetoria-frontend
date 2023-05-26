export const BASE_URL = "http://localhost:8080/api/v1/";
export const URL_REGISTER = `${BASE_URL}auth/register`;
export const URL_CLIENT = `${BASE_URL}client`;
export const URL_AUTHENTICATE = `${BASE_URL}auth/authenticate`;

export const STORAGE_AUTH = localStorage.getItem("authRegister");
export const TOKEN = STORAGE_AUTH ? JSON.parse(STORAGE_AUTH).token : "";
export const AUTHORIZATION = `Bearer ${TOKEN}`;

export const PARSED_NAME = STORAGE_AUTH ? JSON.parse(STORAGE_AUTH).name : "";
