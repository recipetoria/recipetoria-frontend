import UploadPhoto from "../../assets/png/upload_photo.png";
import "./DropPhoto.scss";

export default function DropPhoto() {
  return (
    <section className="drop-photo">
      <div className="drop-photo__wrapper">
        <div className="drop-photo__img-wrapper">
          <img src={UploadPhoto} alt="upload" className="drop-photo__img" />
        </div>
        <span className="drop-photo__text">Drag and drop your image here</span>
      </div>
    </section>
  );
}
