import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ShoppingListPage from "./pages/ShoppingListPage/ShoppingListPage";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="shopping_list" element={<ShoppingListPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
