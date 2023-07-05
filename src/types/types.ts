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
  categoryName?: string;
  categoryRename?: string;
  recipeName?: string;
};

export type InputNames =
  | "nickname"
  | "email"
  | "password"
  | "checkbox"
  | "repeatPassword"
  | "oldPassword"
  | "categoryName"
  | "categoryRename"
  | "recipeName";

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

export interface Tag {
  id: number;
  name: string;
  mainPhoto: null | string;
  applicationUserId: number;
  recipeIds: [];
}

export interface TagsResponse extends IResponse {
  data: {
    allTagsDTOs: Tag[];
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

export interface IShoppingListTableItem {
  isLined: boolean;
  defaultValue: number | string;
  classMode: string;
  editMode: string;
  canItBeEmpty: boolean;
  id: number;
  field: string;
  isDisable: (a: boolean) => void;
  isHoverByTrash: boolean;
  number?: number;
}

export interface IShoppingListTableString {
  id: number;
  name: string;
  amount: number;
  measureDefault: string;
  isLined: boolean;
  editMode: string;
  setActiveSelect: (id: number) => void;
  isActiveSelect: boolean;
  number?: number;
}

export interface IModalContentWitInput {
  label: string;
  placeholder: string;
  inputName: InputNames;
  tagId?: number;
}

export interface AddProfilePhotoProps {
  mode: "profile" | "category";
  imageSrc: string;
  tagId?: number;
}
