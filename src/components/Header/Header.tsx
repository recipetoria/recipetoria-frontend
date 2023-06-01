import { Link } from "react-router-dom";
import "./Header.scss";
import Logo from "../../assets/svg/Logo";
import DefaultAvatar from "../../assets/png/default_ava.png";
import { useAppSelector } from "../../app/hooks";

export default function Header() {
  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);

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
                <Link to="/all_categories">All Categories</Link>
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
            <Link to="profile">
              <div className="default-avatar__wrapper">
                <img src={DefaultAvatar} alt="" className="default-avatar" />
              </div>
            </Link>
          )}
        </article>
      </div>
    </header>
  );
}
