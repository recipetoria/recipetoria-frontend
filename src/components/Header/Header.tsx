import { Link } from "react-router-dom";
import "./Header.scss";
import { useEffect } from "react";
import Logo from "../../assets/svg/Logo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUserPhoto, userPhotoValue } from "../../features/UserPhotoSlice";
import UserPhoto from "../UserPhoto/UserPhoto";

export default function Header() {
  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);
  const token = useAppSelector((state) => state.present.authData.value.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchUserPhoto(token));
    } else {
      dispatch(userPhotoValue(""));
    }
  }, [dispatch, isAuth, token]);

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
                <Link to="/shopping_list">Shopping list</Link>
                <Link to="/add_recipe" className="btn">
                  Add recipe
                </Link>
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
            <Link to="/profile">
              <UserPhoto parent="Header" />
            </Link>
          )}
        </article>
      </div>
    </header>
  );
}
