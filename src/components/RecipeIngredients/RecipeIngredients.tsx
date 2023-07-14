import "./RecipeIngredients.scss";
import CartImage from "../../assets/png/cart.png";
import fakeIngredientsArr from "../../assets/data/fakeIngedientsData";
import PlusIcon from "../../assets/svg/PlusIcon";
import Trash from "../../assets/svg/Trash";

export default function RecipeIngredients() {
  const tableHeadArr = ["#", "Name", "Amount", "Measure", "Action", "Delete"];

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
        <table className="recipe-ingredients__table">
          <tr>
            {tableHeadArr.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
          {fakeIngredientsArr.map((item, indx) => (
            <tr key={`${item.name + indx}`}>
              <td>{indx + 1}</td>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.measurementUnit}</td>
              <td>
                <button type="button">
                  <PlusIcon />
                  <span>Add to shop list</span>
                </button>
              </td>
              <td>
                <button type="button">
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </article>
  );
}
