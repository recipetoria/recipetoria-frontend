import { Link } from "react-router-dom";
import "./Header.scss";
import Logo from "../../assets/svg/Logo";
import DefaultAvatar from "../../assets/png/default_ava.png";

export default function Header() {
  const STORAGE_AUTH = localStorage.getItem("authRegister");
  const IS_AUTH = STORAGE_AUTH ? JSON.parse(STORAGE_AUTH).isAuth : "";
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/">
          <div className="logo__wrapper">
            <Logo color="#35201A" />
          </div>
        </Link>
        <article className="links-n-avatar">
          <section className="links">
            {IS_AUTH ? (
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
          {IS_AUTH && (
            <div className="default-avatar__wrapper">
              <img src={DefaultAvatar} alt="" className="default-avatar" />
            </div>
          )}
        </article>
      </div>
    </header>
  );
}
