import { useContext } from "react";
import "./RecipesCards.scss";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import ModalContentWitInput from "../ModalContentWitInput/ModalContentWitInput";
import BellWithStarImage from "../../assets/png/bell_with-star.png";

interface RecipesCardsProps {
  toggle: () => void;
}

export default function RecipesCards(props: RecipesCardsProps) {
  const { toggle } = props;

  const { setModalContent } = useContext(ModalContentContext);

  return (
    <article className="cards">
      <button
        className="recipe-card"
        type="button"
        onClick={() => {
          toggle();
          setModalContent(
            <ModalContentWitInput
              label="Create new recipe"
              placeholder="Enter recipe name"
              inputName="recipeName"
            />
          );
        }}
      >
        <div className="recipe-card__wrapper">
          <section className="recipe-card__image-wrapper">
            <img
              src={BellWithStarImage}
              alt="create new recipe"
              className="recipe-card__image recipe-card__image_create"
            />
          </section>
          <section className="recipe-card__create-block">
            <span className="recipe-card__create-text">+ Add recipe</span>
          </section>
        </div>
      </button>
    </article>
  );
}
