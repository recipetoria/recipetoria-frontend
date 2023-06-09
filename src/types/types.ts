import { ReactNode } from "react";

export interface IShoppingListItems {
  id: number;
  name: string;
  amount: number;
  measurementUnit: string;
}

export type FormValues = {
  nickname?: string;
  email?: string;
  password?: string;
  checkbox?: string;
  repeatPassword?: string;
  oldPassword?: string;
};

export interface IResponse {
  timeStamp: string;
  statusCode: number;
  message: string;
}

export interface SignResponse extends IResponse {
  data: {
    authenticationResponse: {
      token: string;
    };
  };
}

export interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  children?: ReactNode;
}

export interface UserInfo {
  email: string;
  name: string;
  photo: string;
  password: null;
}
