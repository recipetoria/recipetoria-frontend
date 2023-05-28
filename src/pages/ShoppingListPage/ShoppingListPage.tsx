import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import Print from "../../assets/svg/Print";
import Share from "../../assets/svg/Share";
import Trash from "../../assets/svg/Trash";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ShoppingListTable from "../../components/ShoppingListTable/ShoppingListTable";
import "./ShoppingListPage.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cleanShopListServer } from "../../features/ShopListSlice";
import Snackbar from "../../components/Snackbar/Snackbar";

export default function ShoppingListPage() {
  const componentRef = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.present.isAuth.value);

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/*");
    }
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true,
  });

  return (
    <div>
      {isAuth && (
        <>
          <Header />
          <main>
            <article className="shopping-list-page">
              <section className="img-block" />
              <section className="shopping-list-block">
                <div className="shopping-list-block__wrapper">
                  <article className="shopping-list-block__header">
                    <h2 className="shopping-list-block__h2">Shopping list</h2>
                    <section className="shopping-list-block__btns">
                      <Button icon={<Print />} onClick={handlePrint} />
                      <Button icon={<Share />} onClick={() => {}} />
                      <Button
                        icon={<Trash />}
                        onClick={() => {
                          dispatch(cleanShopListServer());
                        }}
                      />
                    </section>
                  </article>
                  <article
                    className="shopping-list-block__table"
                    ref={componentRef}
                  >
                    <ShoppingListTable />
                  </article>
                </div>
              </section>
              <Snackbar />
            </article>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
