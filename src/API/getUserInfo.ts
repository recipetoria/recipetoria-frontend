import axios, { AxiosResponse } from "axios";
import { URL_USER_INFO } from "../utils/constants";
import { UserInfo } from "../types/types";

interface GetUserInfoResponse {
  timeStamp: string;
  statusCode: number;
  message: string;
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
    });
}
