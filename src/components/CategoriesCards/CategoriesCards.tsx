import allTagsFakeDataArr from "../../assets/data/allTagsFakeData";
import DefaultCategoryPhoto from "../../assets/png/no_photo_categ.png";
import CreateNewCategoryImage from "../../assets/png/create_new_category.png";
import PlusIcon from "../../assets/svg/PlusIcon";

export default function CategoriesCards() {
  const categoriesCardsJsx = allTagsFakeDataArr.map((item) => (
    <section className="card" key={item.name} id={item.id.toString()}>
      <div className="card__wrapper">
        <section className="card__image-wrapper">
          <img src={item.mainPhoto || DefaultCategoryPhoto} alt="category" />
        </section>
        <h4 className="card__name">{item.name}</h4>
      </div>
    </section>
  ));

  return (
    <article className="cards">
      <section className="card">
        <div className="card__wrapper">
          <section className="card__image-wrapper">
            <img src={CreateNewCategoryImage} alt="create new category" />
          </section>
          <section className="card__create-block">
            <PlusIcon />
            <span className="card__name card__name_create">
              Create new category
            </span>
          </section>
        </div>
      </section>
      {categoriesCardsJsx}
    </article>
  );
}
