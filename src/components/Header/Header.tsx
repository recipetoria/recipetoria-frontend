import { Link } from "react-router-dom";
import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/svg/Logo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUserPhoto, userPhotoValue } from "../../features/UserPhotoSlice";
import UserPhoto from "../UserPhoto/UserPhoto";
import { isOpenProfileValue } from "../../features/isOpenProfileModalSlice";
import ProfileModal from "../ProfileModal/ProfileModal";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import ModalContentWitInput from "../ModalContentWitInput/ModalContentWitInput";
import useModal from "../../hooks/useModal";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

export default function Header() {
  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);
  const token = useAppSelector((state) => state.present.authData.value.token);
  const dispatch = useAppDispatch();
  const isOpenModal = useAppSelector(
    (state) => state.present.IsOpenModal.value
  );
  const { setModalContent } = useContext(ModalContentContext);
  const { toggle } = useModal();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchUserPhoto(token));
    } else {
      dispatch(userPhotoValue(""));
    }
  }, [dispatch, isAuth, token]);

  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/">
          <div className="logo__wrapper">
            <Logo color="#35201A" />
          </div>
        </Link>
        <article className="links-n-avatar">
          <section className={`links ${!isAuth ? "links_not-auth" : ""}`}>
            {isAuth ? (
              <>
                <Link to="/all_categories">Categories</Link>
                <Link to="/shopping_list">Shopping List</Link>
                <button
                  type="button"
                  className="header__btn"
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
              </>
            ) : (
              <>
                <Link to="/sign_in" className="btn">
                  Log in
                </Link>
                <Link to="/sign_up" className="orange-btn">
                  Get started
                </Link>
              </>
            )}
          </section>
          {isAuth && (
            <div className="profile-btn-popup">
              <button
                type="button"
                onClick={() => {
                  if (!isOpenModal) {
                    dispatch(isOpenProfileValue());
                  }
                }}
                className="profile-btn-popup__btn"
              >
                <UserPhoto parent="Header" />
              </button>
              <ProfileModal />
            </div>
          )}
        </article>
        <section className="small-size-btns">
          {isAuth ? (
            <button
              type="button"
              className="burger-btn"
              onClick={() => setIsOpenBurgerMenu(true)}
            >
              <BurgerIcon />
            </button>
          ) : (
            <>
              <Link to="/sign_in" className="btn">
                Log in
              </Link>
              <Link to="/sign_up" className="orange-btn">
                Get started
              </Link>
            </>
          )}
        </section>
      </div>
      <BurgerMenu
        visible={isOpenBurgerMenu}
        setIsOpenBurgerMenu={(value) => setIsOpenBurgerMenu(value)}
      />
    </header>
  );
}
