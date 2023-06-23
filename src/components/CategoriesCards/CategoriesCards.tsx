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

  // const [isHoverCategory, SetIsHoverCategory] = useState<{
  //   id: number;
  //   isHover: boolean;
  // }>();

  const categoriesCardsJsx = allTagsFakeDataArr.map((item) => (
    <Link
      to="/"
      className="card"
      key={item.name}
      id={item.id.toString()}
      onMouseEnter={() => {
        // SetIsHoverCategory({
        //   id: item.id,
        //   isHover: true,
        // });
      }}
      onMouseLeave={() => {
        // SetIsHoverCategory({
        //   id: item.id,
        //   isHover: false,
        // });
      }}
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
        <button type="button" className="menu-btn">
          <PencilIcon />
          <ArrowIcon />
        </button>
      </div>
    </Link>
  ));

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
