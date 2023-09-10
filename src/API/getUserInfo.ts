import axios, { AxiosResponse } from "axios";
import { URL_USER_INFO } from "../utils/constants";
import { IResponse, UserInfo } from "../types/types";

interface GetUserInfoResponse extends IResponse {
  data: {
    applicationUserDTO: UserInfo;
  };
}

export default async function getUserInfo(token: string) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: URL_USER_INFO,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .request(config)
    .then((response: AxiosResponse<GetUserInfoResponse>) => {
      return response.data.data.applicationUserDTO;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
