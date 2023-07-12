import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ShoppingListPage from "./pages/ShoppingListPage/ShoppingListPage";
import AllCategoriesPage from "./pages/AllCategoriesPage/AllCategoriesPage";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import SignPage from "./pages/SignPage/SignPage";
import StartPage from "./pages/StartPage/StartPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { isOpenModalValue } from "./features/IsOpenModalSlice";
import { isOpenProfileValue } from "./features/isOpenProfileModalSlice";
import RecipesPage from "./pages/Recipes/RecipesPage";
import Categories from "./components/Categories/Categories";
import RecipePage from "./pages/RecipePage/RecipePage";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isOpenModal = useAppSelector(
    (state) => state.present.IsOpenModal.value
  );
  const isOpenModalMode = useAppSelector(
    (state) => state.present.IsOpenModal.mode
  );
  const isOpenProfileModal = useAppSelector(
    (state) => state.present.isOpenProfileModal.value
  );

  useEffect(() => {
    if (isOpenModal === true && isOpenModalMode === "none") {
      dispatch(isOpenModalValue(false));
    }
    if (isOpenProfileModal === true) {
      dispatch(isOpenProfileValue());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="app">
      <Routes>
        <Route path="" element={<StartPage />} />
        <Route path="sign_up" element={<SignPage signMode="signUp" />} />
        <Route path="sign_in" element={<SignPage signMode="signIn" />} />
        <Route path="all_categories" element={<AllCategoriesPage />}>
          <Route path="" element={<Categories />} />
          <Route path=":tagName/:tagId" element={<RecipesPage />} />
        </Route>
        <Route path="recipe/:recipeName/:recipeId" element={<RecipePage />} />
        <Route path="shopping_list" element={<ShoppingListPage />} />
        <Route path="add_recipe" element={<AddRecipePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
