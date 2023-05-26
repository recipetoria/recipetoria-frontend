export interface IShoppingListItems {
  id: number;
  name: string;
  amount: number;
  measurementUnit: string;
}

export type FormValues = {
  nickname: string;
  email: string;
  password: string;
  checkbox: string;
  repeatPassword: string;
};

export type SignUpResponseMessage = "User registered successfully";
