import { FileUploader } from "react-drag-drop-files";
import "./AddProfilePhoto.scss";
import DropPhoto from "../DropPhoto/DropPhoto";
import useModal from "../../hooks/useModal";
import updateUserProfilePhoto from "../../API/updateUserProfilePhoto";
import { useAppSelector } from "../../app/hooks";

export default function AddProfilePhoto() {
  const fileTypes = ["JPG", "jpeg", "PNG", "GIF"];
  const token = useAppSelector((state) => state.present.authData.value.token);
  const { toggle } = useModal();

  const handleChange = (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      updateUserProfilePhoto(formData, token);
      toggle();
    } else {
      throw new Error("Something went wong with file...");
    }
  };

  return (
    <section className="add-profile-photo">
      <h3 className="add-profile-photo__header">Add profile photo</h3>
      <article className="add-profile-photo__content">
        <section className="add-photo">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            maxSize="5"
          >
            <DropPhoto />
          </FileUploader>
        </section>
        <span className="add-profile-photo__text">or</span>
        <section className="add-profile-photo__btns">
          <button
            type="button"
            className="add-profile-photo__cancel"
            onClick={toggle}
          >
            Cancel
          </button>
          <div className="add-profile-photo__upload">
            <input
              type="file"
              name=""
              id=""
              className="add-profile-photo__input-file"
              onChange={(e) => {
                if (e.currentTarget.files !== null) {
                  handleChange(e.currentTarget.files[0]);
                } else {
                  throw new Error("Something went wong with file...");
                }
              }}
            />
            Upload picture
          </div>
        </section>
      </article>
    </section>
  );
}
