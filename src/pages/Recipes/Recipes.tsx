import { useParams } from "react-router-dom";

export default function Recipes() {
  const { id } = useParams();

  return (
    <main>
      <h1>{id}</h1>
    </main>
  );
}
