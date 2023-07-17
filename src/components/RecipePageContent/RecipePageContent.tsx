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

export default function RecipePageContent(props: { recipeName: string }) {
  const { recipeName } = props;

  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const { modalContent } = useContext(ModalContentContext);
  const { toggle } = useModal();

  const recipeData = useAppSelector((state) => state.present.recipe.value);
  const recipeDataIsLoading = useAppSelector(
    (state) => state.present.recipe.isLoading
  );
  const recipeDataError = useAppSelector((state) => state.present.recipe.error);

  let recipePageContent;

  if (recipeDataIsLoading) {
    recipePageContent = <h2>Loading...(for loader)</h2>;
  } else if (recipeDataError) {
    recipePageContent = <h2>Oops... Something went wrong</h2>;
  } else {
    recipePageContent = (
      <>
        <div className="recipe-page__wrapper">
          <div className="recipe-page-header">
            <h2 className="recipe-page-header__text">{recipeName}</h2>
            <ButtonEdit
              tipText="name"
              editMode="recipeEditName"
              recipeData={recipeData}
            />
          </div>
          <RecipeInstruction recipeData={recipeData} />
          <RecipeIngredients />
          <RecipeCategories recipeId={recipeData.id} />
          <RecipeLinks />
        </div>
        <Modal isOpen={isOpen} toggle={toggle}>
          {modalContent}
        </Modal>
        <Snackbar />
      </>
    );
  }
  return recipePageContent;
}
