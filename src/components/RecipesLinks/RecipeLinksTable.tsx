import { useState } from "react";
import Trash from "../../assets/svg/Trash";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUpdateRecipeInfo } from "../../features/OneRecipeSlice";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";

export default function RecipeLinksTable(props: {
  links: string[];
  recipeId: number;
  recipeName: string;
}) {
  const { links, recipeId, recipeName } = props;

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.present.authData.value.token);

  const [isHoveredByTrashId, setIsHoveredByTrashId] = useState<number | null>(
    null
  );

  return (
    <section className="table-links">
      {links.map((link, indx) => {
        return (
          <div
            className={`table-links__row ${
              isHoveredByTrashId === indx
                ? "table-links__row_hover-by-trash"
                : ""
            }`}
            key={`row-${link}-${recipeId + indx}`}
          >
            <section className="table-links__number-n-link">
              <div className="table-links__cell table-links__cell_number">
                {indx + 1}
              </div>
              <a
                href={link}
                className="table-links__cell table-links__cell_link"
                target="_blank"
                rel="noreferrer"
              >
                {link}
              </a>
            </section>
            <form className="table-links__form table-links__form_delete">
              <button
                type="button"
                className="table-links__delete cell cell_btn"
                onMouseEnter={() => {
                  setIsHoveredByTrashId(indx);
                }}
                onMouseLeave={() => {
                  setIsHoveredByTrashId(null);
                }}
                onClick={() => {
                  if (links) {
                    const copyArr = [...links];
                    copyArr.splice(indx, 1);
                    dispatch(
                      fetchUpdateRecipeInfo({
                        recipeId,
                        token,
                        infoRecipeData: {
                          name: recipeName,
                          links: copyArr,
                        },
                      })
                    );
                    dispatch(
                      SnackbarTextValue({
                        text: "The link was moved to trash",
                        withUndo: false,
                      })
                    );
                  } else {
                    throw new Error(
                      "Custom Error: Somehing went wrong with recipeData.links"
                    );
                  }
                }}
              >
                <Trash />
              </button>
              <span className="caption">Delete</span>
            </form>
          </div>
        );
      })}
    </section>
  );
}
