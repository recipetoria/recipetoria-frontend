import { Route, Routes } from "react-router-dom";
import ShoppingListPage from "./pages/ShoppingListPage/ShoppingListPage";
import AllCategoriesPage from "./pages/AllCategoriesPage/AllCategoriesPage";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import SignPage from "./pages/SignPage/SignPage";
import StartPage from "./pages/StartPage/StartPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="" element={<StartPage />} />
        <Route path="sign_up" element={<SignPage signMode="signUp" />} />
        <Route path="sign_in" element={<SignPage signMode="signIn" />} />
        <Route path="all_categories" element={<AllCategoriesPage />} />
        <Route path="shopping_list" element={<ShoppingListPage />} />
        <Route path="add_recipe" element={<AddRecipePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
