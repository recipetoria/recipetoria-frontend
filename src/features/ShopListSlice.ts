/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IShoppingListItems } from "../types/types";
import { URL_CLIENT } from "../utils/constants";

interface IFetchedValue {
  data: {
    allIngredientDTOs: IShoppingListItems[];
    createdIngredientDTO: IShoppingListItems;
  };
}

const AUTHORIZATION = (token: string) => `Bearer ${token}`;

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (token: string) => {
    const res = await axios.get(URL_CLIENT, {
      headers: {
        Authorization: AUTHORIZATION(token),
      },
    });
    const data = await res.data;
    return data;
  }
);

export interface IAddIngredient extends IShoppingListItems {
  token: string;
}

export const addIngredient = createAsyncThunk(
  "ingredients/addIngredient",
  async (
    { id, name, amount, measurementUnit, token }: IAddIngredient,
    { dispatch }
  ) => {
    const data = JSON.stringify({
      id,
      name,
      amount,
      measurementUnit: measurementUnit.toUpperCase(),
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: URL_CLIENT,
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTHORIZATION(token),
      },
      data,
    };

    axios
      .request(config)
      .then((response) => {
        dispatch(
          addNewShopElement({
            id: response.data.data.createdIngredientDTO.id,
            name: response.data.data.createdIngredientDTO.name,
            amount: response.data.data.createdIngredientDTO.amount,
            measurementUnit:
              response.data.data.createdIngredientDTO.measurementUnit,
          })
        );
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
);

interface IRemoveIngredient {
  id: number;
  token: string;
}

export const removeIngredientByID = createAsyncThunk(
  "ingredients/removeIngredientByID",
  async ({ id, token }: IRemoveIngredient, { dispatch }) => {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${URL_CLIENT}/ingredients/${id}`,
      headers: {
        Authorization: AUTHORIZATION(token),
      },
    };

    axios
      .request(config)
      .then(() => {
        dispatch(
          removeShopElement({
            id,
            name: "",
            amount: 0,
            measurementUnit: "",
          })
        );
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
);

export const updateIngredient = createAsyncThunk(
  "ingredients/updateIngredient",
  async (
    { id, name, amount, measurementUnit }: IShoppingListItems,
    { dispatch }
  ) => {
    const data = JSON.stringify({
      id,
      name,
      amount,
      measurementUnit: measurementUnit.toUpperCase(),
    });

    const config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${URL_CLIENT}/ingredients/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    axios
      .request(config)
      .then(() => {
        dispatch(updateShopElement({ id, name, amount, measurementUnit }));
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
);

export const cleanShopListServer = createAsyncThunk(
  "ingredients/cleanShopListServer",
  async (token: string, { dispatch }) => {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${URL_CLIENT}`,
      headers: {
        Authorization: AUTHORIZATION(token),
      },
    };
    axios
      .request(config)
      .then(() => dispatch(cleanShopList()))
      .catch((error) => {
        throw new Error(error.message);
      });
  }
);

const ShopListSlice = createSlice({
  name: "shopList",
  initialState: {
    value: <IShoppingListItems[]>[],
    isLoading: false,
    error: <string | undefined | null>null,
  },
  reducers: {
    shopListValue: (state, action: PayloadAction<IShoppingListItems[]>) => {
      state.value = action.payload;
    },
    updateShopElement: (state, action: PayloadAction<IShoppingListItems>) => {
      const index = state.value.findIndex(
        (element) => element.id === action.payload.id
      );
      const newArray = [...state.value];
      newArray[index].name = action.payload.name;
      newArray[index].amount = action.payload.amount;
      newArray[index].measurementUnit = action.payload.measurementUnit;
      state.value = newArray;
    },
    addNewShopElement: (state, action: PayloadAction<IShoppingListItems>) => {
      const newArray = [
        ...state.value,
        <IShoppingListItems>{
          id: action.payload.id,
          name: action.payload.name,
          amount: action.payload.amount,
          measurementUnit: action.payload.measurementUnit,
        },
      ];
      state.value = newArray;
    },
    removeShopElement: (state, action: PayloadAction<IShoppingListItems>) => {
      const index = state.value.findIndex(
        (element) => element.id === action.payload.id
      );
      const newArray = [...state.value];
      newArray.splice(index, 1);
      state.value = newArray;
    },
    cleanShopList: (state) => {
      state.value = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: PayloadAction<IFetchedValue>) => {
        state.isLoading = false;
        state.value = action.payload.data.allIngredientDTOs;
      }
    );
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  shopListValue,
  updateShopElement,
  addNewShopElement,
  removeShopElement,
  cleanShopList,
} = ShopListSlice.actions;

export default ShopListSlice.reducer;
