import { ReactNode } from "react";
import allTagsFakeDataArr from "../../assets/data/allTagsFakeData";
import DefaultCategoryPhoto from "../../assets/png/no_photo_categ.png";
import CreateNewCategoryImage from "../../assets/png/create_new_category.png";
import PlusIcon from "../../assets/svg/PlusIcon";
import "./CategoriesCards.scss";
import CreateNewCategory from "../CreateNewCategory/CreateNewCategory";

interface CategoriesCardsProps {
  toggle: () => void;
  modalChildren: (child: ReactNode) => void;
}

export default function CategoriesCards(props: CategoriesCardsProps) {
  const { toggle, modalChildren } = props;

  const categoriesCardsJsx = allTagsFakeDataArr.map((item) => (
    <section className="card" key={item.name} id={item.id.toString()}>
      <div className="card__wrapper">
        <section className="card__image-wrapper">
          <img
            src={item.mainPhoto || DefaultCategoryPhoto}
            alt="category"
            className="card__image"
          />
        </section>
        <h4 className="card__name">{item.name}</h4>
      </div>
    </section>
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
