import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./RecipesPage.scss";
import { categoriesStyleValue } from "../../features/CategoriesStyleSlice";

export default function RecipesPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const componentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const tags = useAppSelector((state) => state.present.tags.value);

  const foundIdInTags = id
    ? tags.map((tag) => tag.name === id).includes(true)
    : false;

  useEffect(() => {
    if (!foundIdInTags) {
      navigate("/*");
    }
  });

  useEffect(() => {
    if (componentRef.current) {
      dispatch(
        categoriesStyleValue({
          style: { height: componentRef.current.offsetHeight },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <div ref={componentRef} className="categories-page__wrapper-div">
      <h2 className="categories-page__h2">{id}</h2>
      <div className="categories-page__breadcrumbs">
        <Link to="/all_categories">Categories</Link>
        <span>/</span>
        <span>{id}</span>
      </div>
    </div>
  );
}
