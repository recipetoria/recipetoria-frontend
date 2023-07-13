import { useRef } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import "./RecipeInstruction.scss";
import Chick1 from "../../assets/data/fakeImages/chick1.png";
import Chick2 from "../../assets/data/fakeImages/chick2.png";
import Chick3 from "../../assets/data/fakeImages/chick3.png";
import Chick4 from "../../assets/data/fakeImages/chick4.png";
import Chick5 from "../../assets/data/fakeImages/chick5.png";
import { Recipe } from "../../types/types";
import getPhotoFromBytes from "../../utils/getPhotoFromBytes";
import ArrowSliderIcon from "../../assets/svg/ArrowSliderIcon";
import CircleIcon from "../../assets/svg/CircleIcon";

export default function RecipeInstruction(props: { recipeData: Recipe }) {
  const { recipeData } = props;
  const photosData: string[] = [
    Chick1,
    Chick2,
    Chick3,
    Chick4,
    Chick5,
    Chick1,
    Chick2,
    Chick3,
    Chick4,
    Chick5,
    Chick1,
    Chick2,
    Chick3,
  ];

  const dotRef = useRef<HTMLButtonElement>();

  const visibleSlides = 5;

  return (
    <article className="recipe-instruction">
      <div className="recipe-instruction__wrapper">
        <section className="photo-n-instruction">
          <div className="photo-n-instruction__photo-wrapper">
            <img
              src={getPhotoFromBytes(recipeData.mainPhoto || "")}
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
        </section>
        <section className="photos-block">
          <h4 className="photos-block__h4">Photos you’ve already added</h4>
          <CarouselProvider
            naturalSlideWidth={1}
            naturalSlideHeight={1}
            totalSlides={photosData.length}
            infinite
            isIntrinsicHeight
            visibleSlides={visibleSlides}
            step={3}
            className="carousel"
          >
            <Slider>
              {[...photosData].map((item, indx) => (
                <Slide index={indx} key={`${item + indx}`}>
                  <Image src={item} alt={item} hasMasterSpinner />
                </Slide>
              ))}
            </Slider>
            <div className="carousel__controllers">
              <ButtonBack className="carousel__btn">
                <ArrowSliderIcon />
              </ButtonBack>
              <div className="carousel__dots">
                {[...photosData].map((item, indx) => {
                  const dotsArr = [];
                  if (
                    indx % visibleSlides === 0 ||
                    indx + 1 > photosData.length - 1
                  ) {
                    dotsArr.push(
                      <Dot key={`${item + indx}`} slide={indx}>
                        <CircleIcon />
                      </Dot>
                    );
                  }
                  return dotsArr;
                })}
              </div>
              <ButtonNext className="carousel__btn carousel__btn_next">
                <ArrowSliderIcon />
              </ButtonNext>
            </div>
          </CarouselProvider>
        </section>
      </div>
    </article>
  );
}
