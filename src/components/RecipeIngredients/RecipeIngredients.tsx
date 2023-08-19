import "./RecipeIngredients.scss";
import { useEffect } from "react";
import Table from "../Table/Table";
import { Recipe } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUpdateRecipeInfo } from "../../features/OneRecipeSlice";
import useResize from "../../hooks/useResize";
import Cart from "./Images/Cart";

export default function RecipeIngredients(props: { recipeData: Recipe }) {
  const { recipeData } = props;

  const dispatch = useAppDispatch();
  const { isScreenMd } = useResize();

  const token = useAppSelector((state) => state.present.authData.value.token);

  useEffect(() => {
    if (recipeData.ingredientDTOs) {
      if (recipeData.ingredientDTOs?.length === 0) {
        dispatch(
          fetchUpdateRecipeInfo({
            recipeId: recipeData.id,
            token,
            infoRecipeData: {
              name: recipeData.name,
              ingredientDTOs: [
                {
                  name: "Type ingredient name here",
                  amount: 1,
                  measurementUnit: "PACK",
                },
              ],
            },
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData.ingredientDTOs, recipeData.ingredientDTOs?.length]);

  return (
    <article className="recipe-ingredients">
      <div className="recipe-ingredients__wrapper">
        <div className="recipe-ingredients__h3-wrapper">
          {isScreenMd ? <Cart /> : ""}
          <h3 className="recipe-ingredients__h3">Ingredients</h3>
        </div>
        {isScreenMd ? "" : <Cart />}
        <Table
          mode="recipe"
          ingredientsObj={recipeData.ingredientDTOs || []}
          parentObj={recipeData}
        />
      </div>
    </article>
  );
}
