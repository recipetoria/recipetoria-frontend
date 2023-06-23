import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import allTagsFakeDataArr from "../../assets/data/allTagsFakeData";
import DefaultCategoryPhoto from "../../assets/png/no_photo_categ.png";
import CreateNewCategoryImage from "../../assets/png/create_new_category.png";
import PlusIcon from "../../assets/svg/PlusIcon";
import "./CategoriesCards.scss";
import CreateNewCategory from "../CreateNewCategory/CreateNewCategory";
import PencilIcon from "../../assets/svg/PencilIcon";
import ArrowIcon from "../../assets/svg/ArrowIcon";

interface CategoriesCardsProps {
  toggle: () => void;
  modalChildren: (child: ReactNode) => void;
}

export default function CategoriesCards(props: CategoriesCardsProps) {
  const { toggle, modalChildren } = props;

  const [isActiveMenu, setIsActiveMenu] = useState<{
    id: number;
    isActive: boolean;
  }>();

  const categoriesCardsJsx = allTagsFakeDataArr.map((item) => {
    const closeMenu = () => setIsActiveMenu({ id: item.id, isActive: false });
    const openMenu = () => setIsActiveMenu({ id: item.id, isActive: true });

    return (
      <Link
        to="/"
        className="card"
        key={item.name}
        id={item.id.toString()}
        onMouseLeave={closeMenu}
      >
        <div className="card__wrapper">
          <section className="card__image-wrapper">
            <img
              src={item.mainPhoto || DefaultCategoryPhoto}
              alt="category"
              className="card__image"
            />
          </section>
          <h4 className="card__name">{item.name}</h4>
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
                isActiveMenu?.id === item.id && isActiveMenu.isActive
                  ? "menu_active"
                  : ""
              }`}
              onMouseLeave={closeMenu}
            >
              <div className="menu__wrapper">
                <button type="button" className="menu__item">
                  Rename category
                </button>
                <button type="button" className="menu__item">
                  Delete category
                </button>
                <button type="button" className="menu__item">
                  Change photo
                </button>
              </div>
            </section>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <article className="cards">
      <button
        className="card"
        type="button"
        onClick={() => {
          toggle();
          modalChildren(<CreateNewCategory />);
        }}
      >
        <div className="card__wrapper">
          <section className="card__image-wrapper">
            <img
              src={CreateNewCategoryImage}
              alt="create new category"
              className="card__image card__image_create"
            />
          </section>
          <section className="card__create-block">
            <PlusIcon />
            <span className="card__create-text">Create new category</span>
          </section>
        </div>
      </button>
      {categoriesCardsJsx}
    </article>
  );
}
