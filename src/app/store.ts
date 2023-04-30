import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ShopListSlice from "../features/ShopListSlice";
import ShopListNewStringSlice from "../features/ShopListNewStringSlice";

export const store = configureStore({
  reducer: {
    shopList: ShopListSlice,
    shopListNewStringSlice: ShopListNewStringSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
