import { useEffect, useState } from "react";
import "./AllCategoriesPage.scss";

export default function AllCategoriesPage() {
  const [state, setState] = useState();

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
      <h1>All Categories</h1>
      <span>Checking the request for success: {state}</span>
    </main>
  );
}
