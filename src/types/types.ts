import { ReactNode } from "react";
import { Control } from "react-hook-form";

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
  recipeRename?: string;
  recipeNameWithoutTag?: string;
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
  | "recipeName"
  | "recipeRename"
  | "recipeNameWithoutTag";

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

export interface Ingredient {
  name: string;
  amount: null | number;
  measurementUnit: null | string;
  id?: number;
  recipeId?: number;
}

export interface Recipe {
  id: number;
  name: string;
  mainPhoto: null | string;
  applicationUserId: number;
  tagDTOs: Tag[];
  ingredientDTOs: null | Ingredient[];
  instructions: null | string;
  instructionPhotos: null | string[];
  links: null | string[];
}

export interface RecipeResponse extends IResponse {
  data: {
    recipeDTO: Recipe;
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
  tagId?: number | Tag[] | "uncategorized";
  recipeId?: number;
}

export interface AddProfilePhotoProps {
  mode: "profile" | "category" | "recipe main" | "recipe";
  imageSrc: string;
  tagId?: number | "uncategorized";
  recipeId?: number;
}

export interface CategoryCardProps {
  mode: "default" | "uncategorized";
  name: string;
  id: number | "uncategorized";
  mainPhoto: string | null;
  toggle: () => void;
}

export interface TableProps {
  mode: "recipe" | "shopList";
  ingredientsObj: Ingredient[];
  parentObj?: Recipe;
}

export interface TableValues {
  ingredient: Ingredient[];
  newIngredient: Ingredient;
}

type ChangedIngredientData = {
  name: string | null;
  amount: number | null;
  measure: string | null;
};

type SetChangedIngredientDataType = (value: ChangedIngredientData) => void;

export interface SelectMeasureProps {
  control: Control<TableValues>;
  name:
    | `ingredient.${number}.measurementUnit`
    | "newIngredient.measurementUnit";
  setSelectValueNewItem: (value: string) => void;
  defaultValue: string | undefined;
  withBorder: boolean;
  changedIngredientData?: ChangedIngredientData;
  setChangedIngredientData?: SetChangedIngredientDataType;
}

export interface CellNameProps {
  name: `ingredient.${number}.name` | "newIngredient.name";
  control: Control<TableValues>;
  withBorder: boolean;
  autoFocus: boolean;
  changedIngredientData?: ChangedIngredientData;
  setChangedIngredientData?: SetChangedIngredientDataType;
}

export interface CellAmountProps {
  name: "newIngredient.amount" | `ingredient.${number}.amount`;
  control: Control<TableValues>;
  withBorder: boolean;
  changedIngredientData?: ChangedIngredientData;
  setChangedIngredientData?: SetChangedIngredientDataType;
}
