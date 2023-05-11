import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Print from "../../assets/svg/Print";
import Share from "../../assets/svg/Share";
import Trash from "../../assets/svg/Trash";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ShoppingListTable from "../../components/ShoppingListTable/ShoppingListTable";
import "./ShoppingListPage.scss";
import { useAppDispatch } from "../../app/hooks";
import { cleanShopList } from "../../features/ShopListSlice";

interface IResponse {
  developerMessage: string;
  localDateTime: string;
  message: string;
  path: string;
  statusCode: number;
}

export default function ShoppingListPage() {
  const componentRef = useRef(null);
  const dispatch = useAppDispatch();

  const [stateShop, setStateShop] = useState<IResponse>();

  useEffect(() => {
    const dataFetchShop = async () => {
      const dataShopGet = await (
        await fetch(
          "https://recipetoria-production.up.railway.app/api/v1/client",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWNpcGV0b3JpYSIsInN1YiI6IkhlbGVuX01jR2x5bm42NkBnbWFpbC5jb20iLCJpYXQiOjE2ODM0ODMzMjgsImV4cCI6MTY4MzU2OTcyOH0.JzSXC2KKo4uCE3nIiJSgut1KSScqibjV2dHYgxFfxGU`,
            },
          }
        )
      ).json();
      setStateShop(dataShopGet);
    };
    setTimeout(() => {
      dataFetchShop();
    }, 1000);
  }, []);
  console.log(stateShop);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true,
  });

  return (
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
                      dispatch(cleanShopList());
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
        </article>
      </main>
      <Footer />
    </>
  );
}
