import "./RecipeIngredients.scss";
import CartImage from "../../assets/png/cart.png";
import fakeIngredientsArr from "../../assets/data/fakeIngedientsData";
import Table from "../Table/Table";

export default function RecipeIngredients() {
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
        <Table mode="withAction" ingredientsObj={fakeIngredientsArr} />
      </div>
    </article>
  );
}
