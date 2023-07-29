import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CheckIcon from "../../assets/svg/CheckIcon";
import { fetchUpdateRecipeInfo } from "../../features/OneRecipeSlice";
import { Recipe, Tag } from "../../types/types";
import "./RecipeCategories.scss";

export default function RecipeCategories(props: { recipeData: Recipe }) {
  const { recipeData } = props;

  const dispatch = useAppDispatch();

  const tags = useAppSelector((state) => state.present.tags.value);
  const token = useAppSelector((state) => state.present.authData.value.token);

  const buttonTagRef = useRef<HTMLButtonElement>(null);
  const [categoriesView, setCategoriesView] = useState(false);

  function handleChangeCategory(tagsArr: Tag[]) {
    dispatch(
      fetchUpdateRecipeInfo({
        recipeId: recipeData.id,
        token,
        infoRecipeData: {
          name: recipeData.name,
          tagDTOs: [...tagsArr],
        },
      })
    );
  }

  function addCategory(item: Tag) {
    const newTagArr = [
      ...recipeData.tagDTOs,
      {
        id: item.id,
        name: item.name,
        mainPhoto: item.mainPhoto,
        applicationUserId: item.applicationUserId,
        recipeIds: item.recipeIds,
      },
    ];

    handleChangeCategory(newTagArr);
  }

  function removeCategory(selectTagName: string) {
    const copyTags = [...recipeData.tagDTOs];
    const findIndexRecipeTagsArr = copyTags.findIndex(
      (tag) => tag.name === selectTagName
    );
    copyTags.splice(findIndexRecipeTagsArr, 1);

    handleChangeCategory(copyTags);
  }

  function categoriesHeight() {
    let height = "";
    if (!categoriesView) {
      if (buttonTagRef.current) {
        height = `${buttonTagRef.current.clientHeight * 2 + 6.5 * 2}px`;
      } else {
        height = `${39 * 2}px`;
      }
    }
    return height;
  }

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
          <section
            className="categories-n-header__categories"
            style={{
              height: categoriesHeight(),
            }}
          >
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
                    if (!isExistOnTags) {
                      addCategory(item);
                    } else {
                      removeCategory(item.name);
                    }
                  }}
                  ref={buttonTagRef}
                >
                  {isExistOnTags ? <CheckIcon /> : ""}
                  <span>{item.name}</span>
                </button>
              );
            })}
            {tags
              .map((tag) => tag.recipeIds.includes(recipeData.id as never))
              .every((item) => item === false) ? (
              <button
                type="button"
                className="category-btn category-btn_selected"
              >
                <CheckIcon />
                <span>Uncategorized</span>
              </button>
            ) : (
              ""
            )}
          </section>
        </section>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setCategoriesView(!categoriesView);
          }}
          className="recipe-categories__view-btn"
        >
          {!categoriesView ? "View" : "Hide"} all categories
        </button>
      </div>
    </article>
  );
}
