import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./AddProfilePhoto.scss";
import DropPhoto from "../DropPhoto/DropPhoto";
import useModal from "../../hooks/useModal";
import ErrorInForm from "../ErrorInForm/ErrorInForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUpdateUserPhoto } from "../../features/UserPhotoSlice";

interface AddProfilePhotoProps {
  mode: "profile" | "category";
  imageSrc: string;
}

export default function AddProfilePhoto(props: AddProfilePhotoProps) {
  const { mode, imageSrc } = props;

  const fileTypes = ["JPG", "jpeg", "PNG", "GIF"];
  const fileSize = "5";
  const token = useAppSelector((state) => state.present.authData.value.token);
  const { toggle } = useModal();
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (file: File) => {
    if (file) {
      if (mode === "profile") {
        setError("");
        const formData = new FormData();
        formData.append("file", file);
        dispatch(fetchUpdateUserPhoto({ data: formData, token }));
        toggle();
      }
    } else {
      throw new Error("Something went wong with file...");
    }
  };

  return (
    <section className="add-profile-photo">
      <h3 className="add-profile-photo__header">Add {mode} photo</h3>
      {error !== "" && <ErrorInForm errorMessage={error} />}
      <article className="add-profile-photo__content">
        <section className="add-photo">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            maxSize={fileSize}
            onTypeError={setError}
            onSizeError={setError}
          >
            <DropPhoto imageSrc={imageSrc} />
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
          <FileUploader
            types={fileTypes}
            name="file"
            maxSize={fileSize}
            handleChange={handleChange}
            onTypeError={setError}
            onSizeError={setError}
          >
            <div className="add-profile-photo__upload">Upload picture</div>
          </FileUploader>
        </section>
      </article>
    </section>
  );
}
