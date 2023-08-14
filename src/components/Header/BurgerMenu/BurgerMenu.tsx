import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CrossIcon from "../../../assets/svg/CrossIcon";
import UserPhoto from "../../UserPhoto/UserPhoto";
import { ModalContentContext } from "../../../contexts/ModalContentContext";
import useModal from "../../../hooks/useModal";
import ModalContentWitInput from "../../ModalContentWitInput/ModalContentWitInput";
import "./BurgerMenu.scss";

interface BurgerMenuProps {
  visible: boolean;
  setIsOpenBurgerMenu: (value: boolean) => void;
}

export default function BurgerMenu(props: BurgerMenuProps) {
  const { visible, setIsOpenBurgerMenu } = props;

  const { setModalContent } = useContext(ModalContentContext);
  const { toggle } = useModal();

  const [direction, setDirection] = useState<"normal" | "reverse">("normal");

  return (
    <aside
      className={`burger-menu burger-menu_${direction}`}
      style={{
        display: visible ? "block" : "none",
        zIndex: visible ? 99999 : -9,
      }}
    >
      <div className="burger-menu__wrapper">
        <button
          type="button"
          className="burger-menu__btn"
          onClick={() => {
            setDirection("reverse");
            setTimeout(() => {
              setIsOpenBurgerMenu(false);
              setDirection("normal");
            }, 1000);
          }}
        >
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
                setIsOpenBurgerMenu(false);
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
