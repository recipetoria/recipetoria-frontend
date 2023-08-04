import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./ShoppingListPage.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchShopList } from "../../features/ShoppingListSlice";
import ShoppingListPageContent from "../../components/ShoppingListPageContent/ShoppingListPageContent";

export default function ShoppingListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);
  const token = useAppSelector((state) => state.present.authData.value.token);

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/*");
    }
    dispatch(fetchShopList({ token }));
  });

  return (
    <div className="app__wrapper">
      {isAuth && (
        <>
          <Header />
          <main>
            <ShoppingListPageContent />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
