import { Link } from "react-router-dom";
import Logo from "../../assets/svg/Logo";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <section className="footer__left-side">
          <Link to="/">
            <div className="logo__wrapper">
              <Logo color="#FAE8CD" />
            </div>
          </Link>

          <span className="footer-links-n-rights__right footer-links-n-rights__right_left-side">
            All right reserved
          </span>
        </section>
        <article className="footer-links-n-rights">
          <a href="/#">Privacy policy</a>
          <a href="/#">Cookie policy</a>
          <a href="/#">Terms of use</a>
          <span className="footer-links-n-rights__right footer-links-n-rights__right_right-side">
            All right reserved
          </span>
        </article>
      </div>
    </footer>
  );
}
