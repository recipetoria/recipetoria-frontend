import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import undoable from "redux-undo";
import ShopListSlice from "../features/ShopListSlice";
import ShopListNewStringSlice from "../features/ShopListNewStringSlice";
import SnackbarTextSlice from "../features/SnackbarTextSlice";

const rootReducer = combineReducers({
  shopListNewStringSlice: ShopListNewStringSlice,
  snackbarTextSlice: SnackbarTextSlice,
  shopList: ShopListSlice,
});

const undoableRootReducer = undoable(rootReducer);

export const store = configureStore({
  reducer: undoableRootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
