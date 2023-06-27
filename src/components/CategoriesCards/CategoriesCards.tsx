import { ReactNode } from "react";
import CreateNewCategoryImage from "../../assets/png/create_new_category.png";
import PlusIcon from "../../assets/svg/PlusIcon";
import "./CategoriesCards.scss";
import ModalContentWitInput from "../ModalContentWitInput/ModalContentWitInput";
import { useAppSelector } from "../../app/hooks";
import CategoryCard from "./CategoryCard";

interface CategoriesCardsProps {
  toggle: () => void;
  modalChildren: (child: ReactNode) => void;
}

export default function CategoriesCards(props: CategoriesCardsProps) {
  const { toggle, modalChildren } = props;

  const tagsValue = useAppSelector((state) => state.present.tags.value);

  const categoriesCardsJsx = tagsValue.map((item) => (
    <CategoryCard
      id={item.id}
      name={item.name}
      mainPhoto={item.mainPhoto}
      toggle={toggle}
      modalChildren={modalChildren}
      key={item.name}
    />
  ));

  return (
    <article className="cards">
      <button
        className="card"
        type="button"
        onClick={() => {
          toggle();
          modalChildren(
            <ModalContentWitInput
              label="Create new category"
              placeholder="Enter the new category name"
              inputName="categoryName"
            />
          );
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
