import { Link } from "react-router-dom";
import "./Header.scss";
import Logo from "../../assets/svg/Logo";
import DefaultAvatar from "../../assets/png/default_ava.png";

export default function Header() {
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
            <Link to="/all_categories">All Categories</Link>
            <Link to="/shopping_list">Shopping list</Link>
            <Link to="/add_recipe" className="btn">
              Add recipe
            </Link>
          </section>
          <div className="default-avatar__wrapper">
            <img src={DefaultAvatar} alt="" className="default-avatar" />
          </div>
        </article>
      </div>
    </header>
  );
}
