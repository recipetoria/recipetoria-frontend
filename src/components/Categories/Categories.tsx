import { useContext } from "react";
import useModal from "../../hooks/useModal";
import CategoriesCards from "../CategoriesCards/CategoriesCards";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import ModalContentWitInput from "../ModalContentWitInput/ModalContentWitInput";

export default function Categories() {
  const { toggle } = useModal();
  const { setModalContent } = useContext(ModalContentContext);

  return (
    <div className="categories-page__wrapper-div">
      <section className="categories-page__header">
        <h2 className="categories-page__h2">Categories</h2>
        <button
          type="button"
          className="categories-page__btn"
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
          Create new category
        </button>
      </section>
      <CategoriesCards toggle={toggle} />
    </div>
  );
}
