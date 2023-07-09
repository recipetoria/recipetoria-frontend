import useModal from "../../hooks/useModal";
import CategoriesCards from "../CategoriesCards/CategoriesCards";

export default function Categories() {
  const { toggle } = useModal();

  return (
    <div className="categories-page__wrapper-div">
      <h2 className="categories-page__h2">Categories</h2>
      <CategoriesCards toggle={toggle} />
    </div>
  );
}
