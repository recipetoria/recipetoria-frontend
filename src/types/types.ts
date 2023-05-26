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

export interface SignResponse {
  timeStamp: string;
  statusCode: number;
  message: string;
  data: {
    authenticationResponse: {
      token: string;
    };
  };
}
