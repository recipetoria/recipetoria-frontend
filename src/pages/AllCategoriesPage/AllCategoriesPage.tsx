import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AllCategoriesPage.scss";

interface IResponse {
  developerMessage: string;
  localDateTime: string;
  message: string;
  path: string;
  statusCode: number;
}

export default function AllCategoriesPage() {
  const [state] = useState<IResponse>();
  const [stateShop, setStateShop] = useState<IResponse>();

  useEffect(() => {
    const dataFetchShop = async () => {
      const dataShopGet = await (
        await fetch(
          "https://recipetoria-production.up.railway.app/api/v1/client",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWNpcGV0b3JpYSIsInN1YiI6ImVtYWlsOEBtYWlsLmNvbSIsImlhdCI6MTY4MzgyNTAyMiwiZXhwIjoxNjgzOTExNDIyfQ.v_5VQ9l0p1z9GWhcGQaPEaOYqVK_Lj2RJ1Gfhzpegtw`,
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

  return (
    <>
      <Header />
      <main>
        <article className="all-categories-page">
          <h1>All Categories</h1>
          <p className="check">Checking the request for success: </p>
          <p>
            <b>message:</b> {state?.message}{" "}
          </p>
          <p>
            <b>path:</b> {state?.path}{" "}
          </p>
          <p>
            <b>statusCode:</b> {state?.statusCode}{" "}
          </p>
          <p>
            <b>statusCodeShop:</b> {stateShop?.statusCode}{" "}
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
