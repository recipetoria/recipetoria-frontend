import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import DefaultCategoryPhoto from "../../assets/png/no_photo_categ.png";
import PencilIcon from "../../assets/svg/PencilIcon";
import ArrowIcon from "../../assets/svg/ArrowIcon";
import ModalContentWitInput from "../ModalContentWitInput/ModalContentWitInput";
import ModalContentInProfile from "../ModalContentInProfile/ModalContentInProfile";
import DeleteCategoryImage from "../../assets/png/delete_category.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isOpenModalValue } from "../../features/IsOpenModalSlice";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";
import AddProfilePhoto from "../AddProfilePhoto/AddProfilePhoto";
import AddCategoryImage from "../../assets/png/add_category_photo.png";
import getPhotoFromBytes from "../../utils/getPhotoFromBytes";
import { fetchDeleteTag } from "../../features/CategorySlice";

interface CategoryCardProps {
  id: number;
  name: string;
  mainPhoto: string | null;
  toggle: () => void;
  modalChildren: (child: ReactNode) => void;
}

export default function CategoryCard(props: CategoryCardProps) {
  const { id, name, mainPhoto, toggle, modalChildren } = props;

  const dispatch = useAppDispatch();

  const [isActiveMenu, setIsActiveMenu] = useState<{
    id: number;
    isActive: boolean;
  }>();
  const token = useAppSelector((state) => state.present.authData.value.token);

  const closeMenu = () => setIsActiveMenu({ id, isActive: false });
  const openMenu = () => setIsActiveMenu({ id, isActive: true });

  return (
    <Link to="/" className="card" id={id.toString()} onMouseLeave={closeMenu}>
      <div className="card__wrapper">
        <section className="card__image-wrapper">
          <img
            src={
              mainPhoto ? getPhotoFromBytes(mainPhoto) : DefaultCategoryPhoto
            }
            alt="category"
            className="card__image"
          />
        </section>
        <h4 className="card__name">{name}</h4>
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
              isActiveMenu?.id === id && isActiveMenu.isActive
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
                  modalChildren(
                    <ModalContentWitInput
                      label="Rename the category"
                      placeholder="Enter new name for the category"
                      inputName="categoryRename"
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
                  modalChildren(
                    <ModalContentInProfile
                      imageSrc={DeleteCategoryImage}
                      text="Are you sure you want to delete the category?"
                      handleClickByOkBtn={() => {
                        dispatch(
                          fetchDeleteTag({
                            token,
                            tagId: id,
                          })
                        ).then(() => {
                          dispatch(isOpenModalValue(false));
                          dispatch(
                            SnackbarTextValue({
                              text: "The category was deleted",
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
                  modalChildren(
                    <AddProfilePhoto
                      mode="category"
                      imageSrc={AddCategoryImage}
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
