import { useState } from "react";
import { Slide, Image } from "pure-react-carousel";
import getPhotoFromBytes from "../../utils/getPhotoFromBytes";
import PencilIcon from "../../assets/svg/PencilIcon";
import ArrowIcon from "../../assets/svg/ArrowIcon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUpdateRecipeMainPhoto } from "../../features/RecipesSlice";

interface RecipeInstructionSlideProps {
  indx: number;
  photo: string;
  recipeId: number;
}

export default function RecipeInstructionSlide(
  props: RecipeInstructionSlideProps
) {
  const { indx, photo, recipeId } = props;

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.present.authData.value.token);

  const [isActiveMenu, setIsActiveMenu] = useState<{
    id: number;
    isActive: boolean;
  }>();
  const closeMenu = () => setIsActiveMenu({ id: indx, isActive: false });
  const openMenu = () => setIsActiveMenu({ id: indx, isActive: true });

  return (
    <Slide index={indx} className="carousel__slide" onMouseLeave={closeMenu}>
      <Image src={getPhotoFromBytes(photo)} alt={photo} hasMasterSpinner />
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
            isActiveMenu?.id === indx && isActiveMenu.isActive
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
                // const formData = new FormData();
                // formData.append("file", photo);

                // console.log(formData);

                // dispatch(
                //   fetchUpdateRecipeMainPhoto({
                //     data: formData,
                //     recipeId,
                //     token,
                //   })
                // );
              }}
            >
              Set as cover photo
            </button>
            <button
              type="button"
              className="menu__item"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Set as category photo
            </button>
            <button
              type="button"
              className="menu__item"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Delete photo
            </button>
          </div>
        </section>
      </div>
    </Slide>
  );
}
