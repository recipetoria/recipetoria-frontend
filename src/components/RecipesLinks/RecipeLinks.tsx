import "./RecipeLinks.scss";
import LinksImage from "../../assets/png/links_image.png";

export default function RecipeLinks() {
  return (
    <article className="recipe-links">
      <div className="recipe-links__wrapper">
        <section className="links-block">
          <h3 className="links-block__h3">Links to external sources</h3>
          <div className="links-block__links">
            {/* TODO: Add links realization here */}
          </div>
          <div className="links-block__add-link">
            <h4 className="links-block__h4">Add link</h4>
            {/* TODO: Add form for add link here */}
          </div>
        </section>
        <div className="recipe-links__image-wrapper">
          <img src={LinksImage} alt="links" className="recipe-links__image" />
        </div>
      </div>
    </article>
  );
}
