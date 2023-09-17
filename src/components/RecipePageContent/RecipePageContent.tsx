import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import Button from "../Button/Button";
import Trash from "../../assets/svg/Trash";
import ModalContentInProfile from "../ModalContentInProfile/ModalContentInProfile";
import DeleteRecipeImage from "../../assets/png/delete_recipe.png";
import { fetchDeleteRecipe } from "../../features/RecipesSlice";
import { isOpenModalValue } from "../../features/IsOpenModalSlice";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";

export default function RecipePageContent() {
  const { toggle } = useModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { modalContent, setModalContent } = useContext(ModalContentContext);
  const isOpen = useAppSelector((state) => state.present.IsOpenModal.value);
  const recipeData = useAppSelector((state) => state.present.recipe.value);
  const token = useAppSelector((state) => state.present.authData.value.token);

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
          <Button
            icon={<Trash />}
            onClick={() => {
              toggle();
              setModalContent(
                <ModalContentInProfile
                  imageSrc={DeleteRecipeImage}
                  text="Are you sure you want to delete the recipe?"
                  submitBtn={{ text: "Delete", style: "orange_btn" }}
                  cancelBtnStyle="borderBtn"
                  handleClickByOkBtn={() => {
                    dispatch(
                      fetchDeleteRecipe({
                        recipeId: recipeData.id,
                        token,
                      })
                    ).then(() => {
                      dispatch(isOpenModalValue(false));
                      navigate("/");
                      dispatch(
                        SnackbarTextValue({
                          text: "The recipe was deleted",
                          withUndo: true,
                        })
                      );
                    });
                  }}
                />
              );
            }}
            disabled={false}
          />
        </div>
        <RecipeInstruction recipeData={recipeData} />
        <RecipeIngredients recipeData={recipeData} />
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
