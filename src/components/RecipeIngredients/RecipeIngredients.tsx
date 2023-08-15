import { useEffect } from "react";
import "./RecipeIngredients.scss";
import CartImage from "../../assets/png/cart.png";
import Table from "../Table/Table";
import { Recipe } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUpdateRecipeInfo } from "../../features/OneRecipeSlice";

export default function RecipeIngredients(props: { recipeData: Recipe }) {
  const { recipeData } = props;

  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.present.authData.value.token);

  // TODO: REC-225: возможно дважды отправляется запрос на сервер, так как на бэке две строчки подряд с таким именем
  // Возможно стоит переписать в виде строки с изменяемыми ячейками и данными в виде placeholder, либо проверять если рецепта нет то сразу ставить мод с включенный новой строкой setIsActiveAddNewItem(true)

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
  });

  return (
    <article className="recipe-ingredients">
      <div className="recipe-ingredients__wrapper">
        <h3 className="recipe-ingredients__h3">Ingredients</h3>
        <div className="recipe-ingredients__image-wrapper">
          <img
            src={CartImage}
            alt="cart"
            className="recipe-ingredients__image"
          />
        </div>
        <Table
          mode="recipe"
          ingredientsObj={recipeData.ingredientDTOs || []}
          parentObj={recipeData}
        />
      </div>
    </article>
  );
}
