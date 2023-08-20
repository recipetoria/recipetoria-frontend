import CartImage from "../../../assets/png/cart.png";

export default function Cart() {
  return (
    <div className="recipe-ingredients__image-wrapper">
      <img src={CartImage} alt="cart" className="recipe-ingredients__image" />
    </div>
  );
}
