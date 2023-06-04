import axios, { AxiosResponse } from "axios";
import { URL_UPDATE_NAME_AND_EMAIL } from "../utils/constants";
import setRegister from "../utils/storage";
import { UserInfo } from "../types/types";

interface UpdateUserNameAndEmailResponse {
  timeStamp: string;
  statusCode: number;
  message: string;
  data: {
    updatedApplicationUserDTO: UserInfo;
  };
}

export default function updateUserNameAndEmail(
  email: string,
  name: string,
  token: string
) {
  const data = JSON.stringify({
    email,
    name,
  });

  const config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: URL_UPDATE_NAME_AND_EMAIL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  axios
    .request(config)
    .then((response: AxiosResponse<UpdateUserNameAndEmailResponse>) => {
      setRegister(
        token,
        response.data.data.updatedApplicationUserDTO.name,
        true
      );
    })
    .catch((error) => {
      throw new Error(error);
    });
}
