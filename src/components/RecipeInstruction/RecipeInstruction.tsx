import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useContext } from "react";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import "./RecipeInstruction.scss";
import { Recipe } from "../../types/types";
import getPhotoFromBytes from "../../utils/getPhotoFromBytes";
import ArrowSliderIcon from "../../assets/svg/ArrowSliderIcon";
import CircleIcon from "../../assets/svg/CircleIcon";
import NoPhotoImage from "../../assets/png/no_recipe_photo.png";
import NoPhotoImageBig from "../../assets/png/no_recipe_photo_big.png";
import PlusIcon from "../../assets/svg/PlusIcon";
import useModal from "../../hooks/useModal";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import AddProfilePhoto from "../AddProfilePhoto/AddProfilePhoto";
import CameraImage from "../../assets/png/add_category_photo.png";
import RecipeInstructionSlide from "./RecipeInstructionSlide";
import useResize from "../../hooks/useResize";

export default function RecipeInstruction(props: { recipeData: Recipe }) {
  const { recipeData } = props;

  const { toggle } = useModal();
  const { setModalContent } = useContext(ModalContentContext);
  const { isScreenSm, isScreenMd, isScreenLg, isScreenXl } = useResize();

  let initialValueOfVisibleSlides = 5;
  let naturalSlideWidth = 215;
  let naturalSlideHeight = 165;
  let slideStep = 3;
  switch (true) {
    case isScreenSm:
      initialValueOfVisibleSlides = 2;
      naturalSlideWidth = 133;
      naturalSlideHeight = 103;
      slideStep = 1;
      break;
    case isScreenMd:
      initialValueOfVisibleSlides = 3;
      naturalSlideWidth = 133;
      naturalSlideHeight = 103;
      slideStep = 2;
      break;
    case isScreenLg:
      initialValueOfVisibleSlides = 3;
      slideStep = 2;
      break;
    case isScreenXl:
      initialValueOfVisibleSlides = 3;
      slideStep = 2;
      break;
    default:
      break;
  }

  let photosData: string[] = [];
  let visibleSlides = initialValueOfVisibleSlides;
  if (recipeData.instructionPhotos) {
    if (recipeData.instructionPhotos.length > 0) {
      photosData = [...recipeData.instructionPhotos];
    }
    if (recipeData.instructionPhotos.length < initialValueOfVisibleSlides) {
      visibleSlides = recipeData.instructionPhotos.length;
    } else if (recipeData.instructionPhotos.length === 0) {
      visibleSlides = 1;
    }
  }

  return (
    <article className="recipe-instruction">
      <div className="recipe-instruction__wrapper">
        <section className="photo-n-instruction">
          <div className="photo-n-instruction__photo-wrapper">
            <img
              src={
                recipeData.mainPhoto
                  ? getPhotoFromBytes(recipeData.mainPhoto)
                  : NoPhotoImageBig
              }
              alt="instructions"
              className="photo-n-instruction__photo"
            />
          </div>
          <section className="instruction">
            <div className="instruction__header">
              <h3 className="instruction__h3">Cooking instructions</h3>
              <ButtonEdit
                tipText="text"
                editMode="recipeEditText"
                recipeData={recipeData}
              />
            </div>
            {/* TODO: if long text without spaces */}
            <div className="instruction__text">
              {recipeData.instructions ||
                "There are no instructions here yet! It's time to add them"}
            </div>
          </section>
        </section>
        <section className="photos-block">
          <h4 className="photos-block__h4">
            {photosData.length > 0
              ? "Photos you’ve already added"
              : "You haven't uploaded any photos yet"}
          </h4>
          <CarouselProvider
            naturalSlideWidth={naturalSlideWidth}
            naturalSlideHeight={naturalSlideHeight}
            totalSlides={photosData.length || 1}
            infinite
            isIntrinsicHeight
            visibleSlides={visibleSlides}
            step={slideStep}
            className="carousel"
          >
            <Slider>
              <Slide
                index={photosData.length}
                key={`new-photo-${photosData.length}`}
              >
                <button
                  className="add-photo"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggle();
                    setModalContent(
                      <AddProfilePhoto
                        mode="recipe"
                        imageSrc={CameraImage}
                        recipeId={recipeData.id}
                      />
                    );
                  }}
                >
                  <div className="add-photo__image-wrapper">
                    <img
                      src={NoPhotoImage}
                      alt="add"
                      className="add-photo__image"
                    />
                  </div>
                  <div className="add-photo__text">
                    <PlusIcon />
                    <span>Add photo</span>
                  </div>
                </button>
              </Slide>
              {[...photosData].map((item, indx) => (
                <RecipeInstructionSlide
                  key={`${item + indx}`}
                  indx={indx}
                  photo={item}
                  recipeId={recipeData.id}
                />
              ))}
            </Slider>
            {photosData.length > visibleSlides ? (
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
            ) : (
              ""
            )}
          </CarouselProvider>
        </section>
      </div>
    </article>
  );
}
