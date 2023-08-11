import { ReactNode, useContext } from "react";
import CreateNewCategoryImage from "../../assets/png/create_new_category.png";
import PlusIcon from "../../assets/svg/PlusIcon";
import "./CategoriesCards.scss";
import ModalContentWitInput from "../ModalContentWitInput/ModalContentWitInput";
import { useAppSelector } from "../../app/hooks";
import CategoryCard from "./CategoryCard";
import { ModalContentContext } from "../../contexts/ModalContentContext";

interface CategoriesCardsProps {
  toggle: () => void;
}

export default function CategoriesCards(props: CategoriesCardsProps) {
  const { toggle } = props;

  const tagsValue = useAppSelector((state) => state.present.tags.value);
  const tagsIsLoading = useAppSelector((state) => state.present.tags.isLoading);
  const tagsError = useAppSelector((state) => state.present.tags.error);

  const { setModalContent } = useContext(ModalContentContext);

  let categoriesCardsJsx: ReactNode = <div />;

  if (tagsIsLoading) {
    categoriesCardsJsx = <h3>is loading... (for loader in future)</h3>;
  } else if (tagsError) {
    categoriesCardsJsx = <h3>Something went wrong</h3>;
  } else if (tagsValue.length) {
    categoriesCardsJsx = [...tagsValue]
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((item) => (
        <CategoryCard
          id={item.id}
          name={item.name}
          mainPhoto={item.mainPhoto}
          toggle={toggle}
          key={item.name}
          mode="default"
        />
      ));
  }

  return (
    <article className="cards">
      <button
        className="card card_create-new"
        type="button"
        onClick={() => {
          toggle();
          setModalContent(
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
      <CategoryCard
        name="Uncategorized"
        mainPhoto={null}
        mode="uncategorized"
        toggle={toggle}
        id="uncategorized"
      />
      {categoriesCardsJsx}
    </article>
  );
}
