import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CheckIcon from "../../assets/svg/CheckIcon";
import { fetchUpdateRecipeInfo } from "../../features/OneRecipeSlice";
import { Recipe } from "../../types/types";
import "./RecipeCategories.scss";

export default function RecipeCategories(props: { recipeData: Recipe }) {
  const { recipeData } = props;

  const dispatch = useAppDispatch();

  const tags = useAppSelector((state) => state.present.tags.value);
  const token = useAppSelector((state) => state.present.authData.value.token);

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
              const isExistOnTags = item.recipeIds.includes(
                recipeData.id as never
              );
              return (
                <button
                  type="button"
                  className={`category-btn ${
                    isExistOnTags
                      ? "category-btn_selected"
                      : "category-btn_not-selected"
                  }`}
                  key={item.name + item.id}
                  onClick={() => {
                    dispatch(
                      fetchUpdateRecipeInfo({
                        recipeId: recipeData.id,
                        token,
                        infoRecipeData: {
                          name: recipeData.name,
                          tagDTOs: [
                            ...recipeData.tagDTOs,
                            {
                              id: item.id,
                              name: item.name,
                              mainPhoto: item.mainPhoto,
                              applicationUserId: item.applicationUserId,
                              recipeIds: item.recipeIds,
                            },
                          ],
                        },
                      })
                    );
                  }}
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
