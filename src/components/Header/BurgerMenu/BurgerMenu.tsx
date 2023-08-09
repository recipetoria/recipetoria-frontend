import { useContext } from "react";
import { Link } from "react-router-dom";
import CrossIcon from "../../../assets/svg/CrossIcon";
import UserPhoto from "../../UserPhoto/UserPhoto";
import { ModalContentContext } from "../../../contexts/ModalContentContext";
import useModal from "../../../hooks/useModal";
import ModalContentWitInput from "../../ModalContentWitInput/ModalContentWitInput";
import "./BurgerMenu.scss";

export default function BurgerMenu() {
  const { setModalContent } = useContext(ModalContentContext);
  const { toggle } = useModal();

  return (
    <aside className="burger-menu">
      <div className="burger-menu__wrapper">
        <button type="button" className="burger-menu__btn">
          <CrossIcon color="#707077" />
        </button>
        <section className="burger-menu__menu">
          <Link to="/profile" className="burger-menu__profile">
            <UserPhoto parent="Header" />
            <span>Profile</span>
          </Link>
          <article className="burger-menu__menu-items">
            <Link to="/all_categories" className="burger-menu__menu-item-link">
              Categories
            </Link>
            <Link to="/shopping_list" className="burger-menu__menu-item-link">
              Shopping list
            </Link>
            <button
              type="button"
              className="burger-menu__menu-item-btn"
              onClick={(e) => {
                e.preventDefault();
                toggle();
                setModalContent(
                  <ModalContentWitInput
                    label="Create new recipe"
                    placeholder="Enter recipe name"
                    inputName="recipeNameWithoutTag"
                  />
                );
              }}
            >
              New recipe
            </button>
          </article>
        </section>
      </div>
    </aside>
  );
}
