import Logo from "../../assets/svg/Logo";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="logo__wrapper">
          <Logo />
        </div>
        <article className="footer-links-n-rights">
          <a href="/#">Privacy policy</a>
          <a href="/#">Cookie policy</a>
          <a href="/#">Terms of use</a>
          <span className="footer-links-n-rights__right">
            All right reserved
          </span>
        </article>
      </div>
    </footer>
  );
}
