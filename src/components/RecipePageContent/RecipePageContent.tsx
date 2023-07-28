import { useContext } from "react";
import { useAppSelector } from "../../app/hooks";
import useModal from "../../hooks/useModal";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import Modal from "../Modal/Modal";
import RecipeInstruction from "../RecipeInstruction/RecipeInstruction";
import Snackbar from "../Snackbar/Snackbar";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import "../../pages/RecipePage/RecipePage.scss";
import RecipeIngredients from "../RecipeIngredients/RecipeIngredients";
import RecipeCategories from "../RecipeCategories/RecipeCategories";
import RecipeLinks from "../RecipesLinks/RecipeLinks";

export default function RecipePageContent() {
  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const { modalContent } = useContext(ModalContentContext);
  const { toggle } = useModal();
  const recipeData = useAppSelector((state) => state.present.recipe.value);

  return (
    <>
      <div className="recipe-page__wrapper">
        <div className="recipe-page-header">
          <h2 className="recipe-page-header__text">{recipeData.name}</h2>
          <ButtonEdit
            tipText="name"
            editMode="recipeEditName"
            recipeData={recipeData}
          />
        </div>
        <RecipeInstruction recipeData={recipeData} />
        <RecipeIngredients recipeData={recipeData} />
        {/* TODO: поправить обновление стейта, когда добавляем категорию */}
        {/* TODO: если ещё раз нажать на категорию, то категория должна убираться */}
        <RecipeCategories recipeData={recipeData} />
        <RecipeLinks recipeData={recipeData} />
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        {modalContent}
      </Modal>
      <Snackbar />
    </>
  );
}
