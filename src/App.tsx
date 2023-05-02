import { Route, Routes } from "react-router-dom";
import ShoppingListPage from "./pages/ShoppingListPage/ShoppingListPage";
import AllCategoriesPage from "./pages/AllCategoriesPage/AllCategoriesPage";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="all_categories" element={<AllCategoriesPage />} />
        <Route path="shopping_list" element={<ShoppingListPage />} />
        <Route path="add_recipe" element={<AddRecipePage />} />
      </Routes>
    </div>
  );
}

export default App;
