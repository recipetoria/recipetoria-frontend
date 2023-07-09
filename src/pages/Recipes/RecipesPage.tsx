import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./RecipesPage.scss";
import RecipesCards from "../../components/RecipesCards/RecipesCards";
import useModal from "../../hooks/useModal";
import { getTags } from "../../API/tags";
import { Tag } from "../../types/types";
import { fetchRecipesByTagId } from "../../features/RecipesSlice";

export default function RecipesPage() {
  const { tagName, tagId } = useParams();

  const navigate = useNavigate();
  const componentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { toggle } = useModal();

  const token = useAppSelector((state) => state.present.authData.value.token);
  const tags = useAppSelector((state) => state.present.tags.value);
  const isAuth = useAppSelector(
    (authState) => authState.present.authData.value.isAuth
  );

  useEffect(() => {
    if (isAuth !== true) {
      navigate("/*");
    }
    if (tagId) {
      dispatch(fetchRecipesByTagId({ tagId: +tagId, token }));
    } else {
      throw new Error(`Error: Something went wrong with tag id: ${tagId}`);
    }
  });

  // navigate to 404 if tag no exist
  getTags(token).then((value) => {
    const foundIdInTags = tagName
      ? value.map((tag: Tag) => tag.name === tagName).includes(true)
      : false;

    if (!foundIdInTags) {
      navigate("/*");
    }
  });

  return (
    <div ref={componentRef} className="categories-page__wrapper-div">
      <h2 className="categories-page__h2">{tagName}</h2>
      <div className="categories-page__breadcrumbs">
        <Link to="/all_categories">Categories</Link>
        <span>&nbsp;/&nbsp;</span>
        <span>{tagName}</span>
      </div>
      <RecipesCards toggle={toggle} tagId={tagId ? +tagId : undefined} />
    </div>
  );
}
