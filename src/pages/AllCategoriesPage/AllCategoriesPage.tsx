import { useEffect, useState } from "react";
import "./AllCategoriesPage.scss";

interface IResponse {
  developerMessage: string;
  localDateTime: string;
  message: string;
  path: string;
  statusCode: number;
}

export default function AllCategoriesPage() {
  const [state, setState] = useState<IResponse>();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://recipetoria-production.up.railway.app/api/v1/client/ingridients/{0}"
        )
      ).json();
      setState(data);
    };

    dataFetch();
  }, []);

  return (
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
      </article>
    </main>
  );
}
