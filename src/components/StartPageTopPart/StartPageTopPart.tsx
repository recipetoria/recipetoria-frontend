import "./StartPageTopPart.scss";
import LaptopNPhoto from "../../assets/png/laptop-n-photo.png";
import FoldersImage from "../../assets/png/folders.png";
import TomatosNPhoneImage from "../../assets/png/tomatos_branch_phone.png";
import CursorImage from "../../assets/png/coursor.png";
import StarIcon from "../../assets/svg/StarIcon";

export default function StartPageTopPart() {
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
              <h2 className="left-container__h2">
                Recipe{" "}
                <span className="left-container__h2_orange">organizer</span> and
                grocery{" "}
                <span className="left-container__h2_orange">optimizer</span>
              </h2>
            </div>
            <div className="image-wrapper image-wrapper_folders">
              <img src={FoldersImage} alt="folders" className="image" />
            </div>
          </section>
          <section className="left-container__bottom">
            <div className="image-wrapper">
              <img src={TomatosNPhoneImage} alt="folders" className="image" />
            </div>
            <div className="text-n-cursor">
              <span className="text-n-cursor__text">
                Bring together your personal recipes in one place and develop a
                grocery list based on your requirements.
              </span>
              <div className="image-wrapper image-wrapper_cursor">
                <img src={CursorImage} alt="cursor" className="image" />
              </div>
            </div>
          </section>
        </section>
        <section className="right-container">
          <div className="image-wrapper image-wrapper_laptop">
            <img src={LaptopNPhoto} alt="laptop" className="image" />
          </div>
        </section>
      </div>
    </article>
  );
}
