import { ReactNode, useContext } from "react";
import "./RecipesCards.scss";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import ModalContentWitInput from "../ModalContentWitInput/ModalContentWitInput";
import BellWithStarImage from "../../assets/png/bell_with-star.png";
import { useAppSelector } from "../../app/hooks";
import RecipeCard from "./RecipeCard";

interface RecipesCardsProps {
  toggle: () => void;
  tagId: number | undefined;
}

export default function RecipesCards(props: RecipesCardsProps) {
  const { toggle, tagId } = props;

  const { setModalContent } = useContext(ModalContentContext);
  const recipesIsLoading = useAppSelector(
    (state) => state.present.recipes.isLoading
  );
  const recipesArr = useAppSelector((state) => state.present.recipes.value);
  const recipesError = useAppSelector((state) => state.present.recipes.error);

  let recipesCards: ReactNode = <div />;

  if (recipesIsLoading) {
    recipesCards = <h3>is loading... (for loader in future)</h3>;
  } else if (recipesError) {
    recipesCards = <h3>Something went wrong</h3>;
  } else if (typeof recipesArr === "object" && recipesArr.length > 0) {
    if (tagId) {
      recipesCards = [...recipesArr]
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((item) => (
          <RecipeCard
            recipeId={item.id}
            tagId={tagId}
            name={item.name}
            mainPhoto={item.mainPhoto}
            toggle={toggle}
            key={item.name}
          />
        ));
    } else {
      throw new Error(`Error: Something went wrong with tag id: ${tagId}`);
    }
  }

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
              tagId={tagId}
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
      {recipesCards}
    </article>
  );
}
