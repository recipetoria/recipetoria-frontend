import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./RecipesPage.scss";
import RecipesCards from "../../components/RecipesCards/RecipesCards";
import useModal from "../../hooks/useModal";
import { getTags } from "../../API/tags";
import { Tag } from "../../types/types";
import { fetchRecipes } from "../../features/RecipesSlice";

export default function RecipesPage() {
  const { tagName, tagId } = useParams();

  const navigate = useNavigate();
  const componentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { toggle } = useModal();

  const token = useAppSelector((state) => state.present.authData.value.token);
  const isAuth = useAppSelector(
    (authState) => authState.present.authData.value.isAuth
  );

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/*");
    }
    if (tagId) {
      dispatch(fetchRecipes(token));
    } else {
      throw new Error(`Error: Something went wrong with tag id: ${tagId}`);
    }
  });

  // navigate to 404 if tag no exist
  getTags(token).then((value) => {
    const foundIdInTags = tagName
      ? value.map((tag: Tag) => tag.name === tagName).includes(true)
      : false;

    if (!foundIdInTags && tagId !== "uncategorized") {
      navigate("/*");
    }
  });

  let tagIdToPass: number | undefined | "uncategorized";

  if (tagId) {
    if (typeof +tagId === "number" && tagId !== "uncategorized") {
      tagIdToPass = +tagId;
    } else if (tagId === "uncategorized") {
      tagIdToPass = tagId;
    }
  }

  return (
    <div ref={componentRef} className="categories-page__wrapper-div">
      <h2 className="categories-page__h2">{tagName}</h2>
      <div className="categories-page__breadcrumbs">
        <Link to="/all_categories">Categories</Link>
        <span>&nbsp;/&nbsp;</span>
        <span>{tagName}</span>
      </div>
      <RecipesCards toggle={toggle} tagId={tagIdToPass} />
    </div>
  );
}
