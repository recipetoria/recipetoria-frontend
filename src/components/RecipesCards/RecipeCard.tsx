import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DefaultCategoryPhoto from "../../assets/png/no_photo_categ.png";
import getPhotoFromBytes from "../../utils/getPhotoFromBytes";
import PencilIcon from "../../assets/svg/PencilIcon";
import ArrowIcon from "../../assets/svg/ArrowIcon";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import ModalContentWitInput from "../ModalContentWitInput/ModalContentWitInput";
import ModalContentInProfile from "../ModalContentInProfile/ModalContentInProfile";
import DeleteRecipeImage from "../../assets/png/delete_recipe.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isOpenModalValue } from "../../features/IsOpenModalSlice";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";
import AddProfilePhoto from "../AddProfilePhoto/AddProfilePhoto";
import AddCategoryImage from "../../assets/png/add_category_photo.png";
import { fetchDeleteRecipe } from "../../features/RecipesSlice";

interface RecipeCardProps {
  recipeId: number;
  tagId: number;
  name: string;
  mainPhoto: string | null;
  toggle: () => void;
}

export default function RecipeCard(props: RecipeCardProps) {
  const { recipeId, tagId, name, mainPhoto, toggle } = props;

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.present.authData.value.token);

  const [isActiveMenu, setIsActiveMenu] = useState<{
    recipeId: number;
    isActive: boolean;
  }>();

  const { setModalContent } = useContext(ModalContentContext);

  const closeMenu = () => setIsActiveMenu({ recipeId, isActive: false });
  const openMenu = () => setIsActiveMenu({ recipeId, isActive: true });

  let srcTagPhoto = DefaultCategoryPhoto;

  if (mainPhoto !== "" && mainPhoto !== null) {
    srcTagPhoto = getPhotoFromBytes(mainPhoto);
  }

  return (
    <Link
      to="/"
      className="recipe-card"
      id={recipeId.toString()}
      onMouseLeave={closeMenu}
    >
      <div className="recipe-card__wrapper">
        <section className="recipe-card__image-wrapper">
          <img
            src={srcTagPhoto}
            alt="category"
            className="recipe-card__image"
          />
        </section>
        <section className="recipe-card__name-wrapper">
          <h4 className="recipe-card__name">{name}</h4>
        </section>
        <div className="menu-block">
          <button
            type="button"
            className="menu-btn"
            onMouseEnter={openMenu}
            onClick={(e) => {
              e.preventDefault();
              if (isActiveMenu?.isActive) {
                closeMenu();
              } else {
                openMenu();
              }
            }}
          >
            <PencilIcon />
            <ArrowIcon />
          </button>
          <section
            className={`menu ${
              isActiveMenu?.recipeId === recipeId && isActiveMenu.isActive
                ? "menu_active"
                : ""
            }`}
            onMouseLeave={closeMenu}
          >
            <div className="menu__wrapper">
              <button
                type="button"
                className="menu__item"
                onClick={(e) => {
                  e.preventDefault();
                  toggle();
                  setModalContent(
                    <ModalContentWitInput
                      label="Rename the recipe"
                      placeholder="Enter new recipe name"
                      inputName="recipeRename"
                      tagId={tagId}
                      recipeId={recipeId}
                    />
                  );
                }}
              >
                Rename category
              </button>
              <button
                type="button"
                className="menu__item"
                onClick={(e) => {
                  e.preventDefault();
                  toggle();
                  setModalContent(
                    <ModalContentInProfile
                      imageSrc={DeleteRecipeImage}
                      text="Are you sure you want to delete the recipe?"
                      handleClickByOkBtn={() => {
                        dispatch(
                          fetchDeleteRecipe({
                            tagId,
                            recipeId,
                            token,
                          })
                        ).then(() => {
                          dispatch(isOpenModalValue(false));
                          dispatch(
                            SnackbarTextValue({
                              text: "The recipe was deleted",
                              withUndo: true,
                            })
                          );
                        });
                      }}
                      submitBtn={{ text: "Delete", style: "orange_btn" }}
                      cancelBtnStyle="borderBtn"
                    />
                  );
                }}
              >
                Delete category
              </button>
              <button
                type="button"
                className="menu__item"
                onClick={(e) => {
                  e.preventDefault();
                  toggle();
                  setModalContent(
                    <AddProfilePhoto
                      mode="recipeMainPhoto"
                      imageSrc={AddCategoryImage}
                      recipeId={recipeId}
                      tagId={tagId}
                    />
                  );
                }}
              >
                Change photo
              </button>
            </div>
          </section>
        </div>
      </div>
    </Link>
  );
}
