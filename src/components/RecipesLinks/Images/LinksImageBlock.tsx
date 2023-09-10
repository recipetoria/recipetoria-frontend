import LinksImage from "../../../assets/png/links_image.png";

export default function LinkImageBlock() {
  return (
    <div className="recipe-links__image-wrapper">
      <img src={LinksImage} alt="links" className="recipe-links__image" />
    </div>
  );
}
