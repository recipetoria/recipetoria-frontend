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
import AuthSlice from "../features/AuthSlice";
import IsOpenModalSlice from "../features/IsOpenModalSlice";
import UserPhotoSlice from "../features/UserPhotoSlice";

const rootReducer = combineReducers({
  shopListNewStringSlice: ShopListNewStringSlice,
  snackbarTextSlice: SnackbarTextSlice,
  shopList: ShopListSlice,
  authData: AuthSlice,
  IsOpenModal: IsOpenModalSlice,
  userPhoto: UserPhotoSlice,
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
