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

          <div className="footer-links-n-rights__right footer-links-n-rights__right_left-side">
            <a
              href="https://forms.gle/XCD3VydkJoR43iVs8"
              target="_blank"
              rel="noreferrer"
            >
              Leave feedback
            </a>
            All right reserved
          </div>
        </section>
        {/* TODO: куда ведут эти ссылки?) */}
        <article className="footer-links-n-rights">
          <a href="/#">Privacy Policy</a>
          <a href="/#">Cookie Policy</a>
          <a href="/#">Terms of Use</a>
          <span className="footer-links-n-rights__right footer-links-n-rights__right_right-side">
            <a
              href="https://forms.gle/XCD3VydkJoR43iVs8"
              target="_blank"
              rel="noreferrer"
            >
              Leave feedback
            </a>
            All right reserved
          </span>
        </article>
      </div>
    </footer>
  );
}
