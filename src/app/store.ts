import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import undoable from "redux-undo";
import SnackbarTextSlice from "../features/SnackbarTextSlice";
import AuthSlice from "../features/AuthSlice";
import IsOpenModalSlice from "../features/IsOpenModalSlice";
import UserPhotoSlice from "../features/UserPhotoSlice";
import IsOpenProfileModalSlice from "../features/isOpenProfileModalSlice";
import TagsSlice from "../features/CategorySlice";
import RecipesSlice from "../features/RecipesSlice";
import OneRecipeSlice from "../features/OneRecipeSlice";
import ShoppingListSlice from "../features/ShoppingListSlice";

const rootReducer = combineReducers({
  snackbarTextSlice: SnackbarTextSlice,
  shoppingList: ShoppingListSlice,
  authData: AuthSlice,
  IsOpenModal: IsOpenModalSlice,
  userPhoto: UserPhotoSlice,
  isOpenProfileModal: IsOpenProfileModalSlice,
  tags: TagsSlice,
  recipes: RecipesSlice,
  recipe: OneRecipeSlice,
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
