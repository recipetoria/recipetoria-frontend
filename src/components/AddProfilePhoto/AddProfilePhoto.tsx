import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./AddProfilePhoto.scss";
import DropPhoto from "../DropPhoto/DropPhoto";
import useModal from "../../hooks/useModal";

export default function AddProfilePhoto() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState<File>();
  const handleChange = (fileChanged: File) => {
    setFile(fileChanged);
  };
  const { toggle } = useModal();

  console.log(file);

  return (
    <section className="add-profile-photo">
      <h3 className="add-profile-photo__header">Add profile photo</h3>
      <article className="add-profile-photo__content">
        <section className="add-photo">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
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
          <button type="button" className="add-profile-photo__upload">
            Upload picture
          </button>
        </section>
      </article>
    </section>
  );
}
