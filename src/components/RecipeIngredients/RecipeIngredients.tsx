import "./RecipeIngredients.scss";
import CartImage from "../../assets/png/cart.png";
import Table from "../Table/Table";
import { Recipe } from "../../types/types";

export default function RecipeIngredients(props: { recipeData: Recipe }) {
  const { recipeData } = props;

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
          mode="withAction"
          ingredientsObj={recipeData.ingredientDTOs || []}
        />
      </div>
    </article>
  );
}
