import { Link } from "react-router-dom";
import "./Header.scss";
import DefaultAvatar from "../../assets/svg/DefaultAvatar";
import Logo from "../../assets/svg/Logo";

export default function Header() {
  return (
    <header>
      <div className="header__wrapper">
        <div className="logo__wrapper">
          <Logo />
        </div>
        <article className="links-n-avatar">
          <section className="links">
            <Link to="/all_categories">All Categories</Link>
            <Link to="/shopping_list">Shopping list</Link>
            <Link to="/add_recipe">Add recipe</Link>
          </section>
          <div className="default-avatar__wrapper">
            <DefaultAvatar />
          </div>
        </article>
      </div>
    </header>
  );
}
