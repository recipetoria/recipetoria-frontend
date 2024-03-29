import "./DropPhoto.scss";

interface DropPhotoProps {
  imageSrc: string;
}

export default function DropPhoto(props: DropPhotoProps) {
  const { imageSrc } = props;

  return (
    <section className="drop-photo">
      <div className="drop-photo__wrapper">
        <div className="drop-photo__img-wrapper">
          <img src={imageSrc} alt="upload" className="drop-photo__img" />
        </div>
        <span className="drop-photo__text">Drag and drop your photo here</span>
      </div>
    </section>
  );
}
