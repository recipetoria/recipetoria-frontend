import { useAppSelector } from "../../app/hooks";
import CheckIcon from "../../assets/svg/CheckIcon";
import "./RecipeCategories.scss";

export default function RecipeCategories(props: { recipeId: number }) {
  const { recipeId } = props;
  const tags = useAppSelector((state) => state.present.tags.value);

  return (
    <article className="recipe-categories">
      <div className="recipe-categories__wrapper">
        <section className="categories-n-header">
          <section className="categories-n-header__header">
            <h3 className="categories-n-header__h3">Categories</h3>
            <span className="categories-n-header__text">
              Assign a category to the recipe
            </span>
          </section>
          <section className="categories-n-header__categories">
            {[...tags].map((item) => {
              const isExistOnTags = item.recipeIds.includes(recipeId as never);
              return (
                <button
                  type="button"
                  className={`category-btn ${
                    isExistOnTags
                      ? "category-btn_selected"
                      : "category-btn_not-selected"
                  }`}
                  key={item.name + item.id}
                >
                  {isExistOnTags ? <CheckIcon /> : ""}
                  <span>{item.name}</span>
                </button>
              );
            })}
          </section>
        </section>
      </div>
    </article>
  );
}
