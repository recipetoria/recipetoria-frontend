import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import "./RecipeInstruction.scss";

export default function RecipeInstruction() {
  return (
    <article className="recipe-instruction">
      <div className="recipe-instruction__wrapper">
        <section className="photo-n-instruction">
          <div className="photo-n-instruction__photo-wrapper">
            <img
              src=""
              alt="instruction"
              className="photo-n-instruction__photo"
            />
          </div>
          <section className="instruction">
            <div className="instruction__header">
              <h3 className="instruction__h3">Cooking instruction</h3>
              <ButtonEdit tipText="text" editMode="recipeEditText" />
            </div>
            <div className="instruction__text">
              Preheat the oven to 200°C. Place the chicken in a roasting pan or
              baking dish. Arrange the quartered potatoes around the chicken.
              Drizzle everything with olive oil, ensuring all ingredients are
              coated. Season with salt, pepper, and your preferred herbs. Place
              the lemon slices on top of the chicken and potatoes. Transfer the
              dish to the preheated oven. Roast for approximately 1 to 1.5
              hours, or until the chicken is cooked through and the potatoes are
              golden and tender. Check the internal temperature of the chicken
              using a meat thermometer; it should read 75°C (165°F) when fully
              cooked.
            </div>
          </section>
          <section className="photos-block">
            <h4 className="photos-block__h4">Photos you’ve already added</h4>
            <CarouselProvider
              naturalSlideWidth={1}
              naturalSlideHeight={1}
              totalSlides={photosData.length}
              infinite
              isIntrinsicHeight
              visibleSlides={5}
              step={3}
            >
              <Slider>
                {[...photosData].map((item, indx) => (
                  <Slide index={indx} key={`${item}`}>
                    <Image src={item} alt={item} hasMasterSpinner />
                  </Slide>
                ))}
              </Slider>
              <ButtonBack>Back</ButtonBack>
              <DotGroup />
              <ButtonNext>Next</ButtonNext>
            </CarouselProvider>
          </section>
        </section>
      </div>
    </article>
  );
}
