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
          "https://recipetoria-production.up.railway.app/api/v1/auth/verify-email?token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWNpcGV0b3JpYSIsInN1YiI6InB1a2Z1a0BtYWlsLmNvbSIsImlhdCI6MTY4Mjg1OTY4NywiZXhwIjoxNjgyOTQ2MDg3fQ.XFGD_QsQcNn3RudQ50lZ2rUxE9WCklkpCQbFRiBmFr8"
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
