import "./RecipeIngredients.scss";
import Table from "../Table/Table";
import { Recipe } from "../../types/types";
import useResize from "../../hooks/useResize";
import Cart from "./Images/Cart";

export default function RecipeIngredients(props: { recipeData: Recipe }) {
  const { recipeData } = props;

  const { isScreenXl } = useResize();

  return (
    <article className="recipe-ingredients">
      <div className="recipe-ingredients__wrapper">
        <div className="recipe-ingredients__h3-wrapper">
          {isScreenXl ? <Cart /> : ""}
          <h3 className="recipe-ingredients__h3">Ingredients</h3>
        </div>
        {isScreenXl ? "" : <Cart />}
        <Table
          mode="recipe"
          ingredientsObj={recipeData.ingredientDTOs || []}
          parentObj={recipeData}
        />
      </div>
    </article>
  );
}
