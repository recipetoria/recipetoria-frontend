import "./StartPageTopPart.scss";
import StarIcon from "../../assets/svg/StarIcon";
import useResize from "../../hooks/useResize";
import Cursor from "./Images/Cursor";
import Folders from "./Images/Folders";
import TomatoesNPhone from "./Images/TomatoesNPhone";
import Laptop from "./Images/Laptop";

export default function StartPageTopPart() {
  const { isScreenSm } = useResize();

  return (
    <article className="start-page-top-part">
      <div className="start-page-top-part__wrapper">
        <section className="left-container">
          <section className="left-container__top">
            <div className="left-container__top-text-wrapper">
              <div className="text-n-star">
                <span className="text-n-star__text">
                  Create your own beloved recipe territory
                </span>
                <StarIcon />
              </div>
              <div className="left-container__h2-wrapper">
                {isScreenSm ? <Cursor /> : ""}
                <h2 className="left-container__h2">
                  Recipe{" "}
                  <span className="left-container__h2_orange">organiser</span>{" "}
                  and grocery{" "}
                  <span className="left-container__h2_orange">optimiser</span>
                </h2>
              </div>
            </div>
            {isScreenSm ? "" : <Folders />}
          </section>
          <section className="left-container__bottom">
            {isScreenSm ? "" : <TomatoesNPhone />}
            <div className="text-n-cursor">
              <span className="text-n-cursor__text">
                Bring together your personal recipes in one place and develop a
                grocery list based on your requirements.
              </span>
              {isScreenSm ? "" : <Cursor />}
            </div>
          </section>
        </section>
        <section className="right-container">
          {isScreenSm ? <TomatoesNPhone /> : ""}
          {isScreenSm ? <Folders /> : ""}
          <Laptop />
        </section>
      </div>
    </article>
  );
}
