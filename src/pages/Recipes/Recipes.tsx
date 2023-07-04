import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export default function Recipes() {
  const { id } = useParams();

  const navigate = useNavigate();

  const tags = useAppSelector((state) => state.present.tags.value);

  const foundIdInTags = id
    ? tags.map((tag) => tag.name === id).includes(true)
    : false;

  useEffect(() => {
    if (!foundIdInTags) {
      navigate("/*");
    }
  });

  return (
    <main>
      <h1>{id}</h1>
    </main>
  );
}
