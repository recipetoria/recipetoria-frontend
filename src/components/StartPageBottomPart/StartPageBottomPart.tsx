import "./StartPageBottomPart.scss";
import StartPageBottomPartTrigger from "./StartPageBottomPartTrigger/StartPageBottomPartTrigger";
import CreateAccImage from "../../assets/png/create_profile_image.png";
import CategoriesImage from "../../assets/png/categories_image.png";
import ShopListImage from "../../assets/png/shop_list_image.png";

export default function StartPageBottomPart() {
  return (
    <article className="start-page-bottom-part">
      <div className="start-page-bottom-part__wrapper">
        <h3 className="start-page-bottom-part__header">How it works</h3>
        <article className="triggers">
          <StartPageBottomPartTrigger
            image={{
              src: CreateAccImage,
              alt: "Create an account",
            }}
            textHeader="Create an account"
            textDescription="Don't let your culinary creativity go to waste! Create an account."
          />
          <StartPageBottomPartTrigger
            image={{
              src: CategoriesImage,
              alt: "Categories your recipes",
            }}
            textHeader="Categories your recipes"
            textDescription="Organize your recipes by category and add photos, descriptions to make them even more enjoyable!"
          />
          <StartPageBottomPartTrigger
            image={{
              src: ShopListImage,
              alt: "Build your shopping list",
            }}
            textHeader="Build your shopping list"
            textDescription="Generate a grocery list from your chosen recipes and breeze through grocery shopping stress-free!"
          />
        </article>
      </div>
    </article>
  );
}
