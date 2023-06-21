import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AllCategoriesPage.scss";
import { useAppSelector } from "../../app/hooks";
import CategoriesCards from "../../components/CategoriesCards/CategoriesCards";

export default function AllCategoriesPage() {
  const isAuth = useAppSelector(
    (authState) => authState.present.authData.value.isAuth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/*");
    }
  });

  return (
    <div className="app__wrapper">
      {isAuth && (
        <>
          <Header />
          <main>
            <article className="categories-page">
              <div className="categories-page__wrapper">
                <h2 className="categories-page__h2">Categories</h2>
                <CategoriesCards />
              </div>
            </article>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
