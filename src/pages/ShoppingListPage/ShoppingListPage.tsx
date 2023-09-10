import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./ShoppingListPage.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchShopList } from "../../features/ShoppingListSlice";
import ShoppingListPageContent from "../../components/ShoppingListPageContent/ShoppingListPageContent";
import getUserInfo from "../../API/getUserInfo";

export default function ShoppingListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);
  const token = useAppSelector((state) => state.present.authData.value.token);

  useEffect(() => {
    if (isAuth !== true && location.pathname !== "sign_in") {
      navigate("/*");
    } else if (token !== "") {
      getUserInfo(token)
        .then(() => {
          dispatch(fetchShopList({ token }));
        })
        .catch(() => {
          navigate("/sign_in");
        });
    }
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
