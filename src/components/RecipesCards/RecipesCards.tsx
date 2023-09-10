import { ReactNode, useContext } from "react";
import { Loader } from "@mantine/core";
import "./RecipesCards.scss";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import ModalContentWitInput from "../ModalContentWitInput/ModalContentWitInput";
import BellWithStarImage from "../../assets/png/bell_with-star.png";
import { useAppSelector } from "../../app/hooks";
import RecipeCard from "./RecipeCard";
import { Recipe } from "../../types/types";

interface RecipesCardsProps {
  toggle: () => void;
  tagId: number | undefined | "uncategorized";
}

export default function RecipesCards(props: RecipesCardsProps) {
  const { toggle, tagId } = props;

  const { setModalContent } = useContext(ModalContentContext);
  const recipesIsLoading = useAppSelector(
    (state) => state.present.recipes.isLoading
  );
  const recipesArr = useAppSelector((state) => state.present.recipes.value);
  const recipesError = useAppSelector((state) => state.present.recipes.error);

  let filteredRecipesArr: Recipe[] = [];

  if (tagId) {
    if (tagId === "uncategorized") {
      filteredRecipesArr = recipesArr.filter(
        (recipe) => recipe.tagDTOs.length === 0
      );
    } else if (typeof +tagId === "number") {
      for (let i = 0; i <= recipesArr.length - 1; i += 1) {
        if (recipesArr[i].tagDTOs.length > 0) {
          if (
            recipesArr[i].tagDTOs.filter((tag) => tag.id === tagId).length > 0
          ) {
            filteredRecipesArr.push(recipesArr[i]);
          }
        }
      }
    }
  }

  let recipesCards: ReactNode = <div />;

  if (recipesIsLoading) {
    recipesCards = <Loader color="orange" size="xl" variant="dots" />;
  } else if (recipesError) {
    recipesCards = <h3>Something went wrong</h3>;
  } else if (typeof recipesArr === "object" && recipesArr.length > 0) {
    if (tagId) {
      recipesCards = [...filteredRecipesArr]
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
        className="recipe-card card_create-new"
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
