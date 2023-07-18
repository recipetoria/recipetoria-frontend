import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./AddProfilePhoto.scss";
import DropPhoto from "../DropPhoto/DropPhoto";
import useModal from "../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUpdateUserPhoto } from "../../features/UserPhotoSlice";
import { fetchUpdateTagPhoto } from "../../features/CategorySlice";
import { AddProfilePhotoProps } from "../../types/types";
import ScaleUpImage from "../../assets/png/scale_up.png";
import FolderImage from "../../assets/png/folder.png";
import { fetchUpdateRecipeMainPhoto } from "../../features/RecipesSlice";
import { fetchAddRecipePhoto } from "../../features/OneRecipeSlice";

export default function AddProfilePhoto(props: AddProfilePhotoProps) {
  const { mode, imageSrc, tagId, recipeId } = props;

  const fileTypes = ["JPG", "jpeg", "PNG", "GIF"];
  const fileSize = "5";
  const token = useAppSelector((state) => state.present.authData.value.token);
  const { toggle } = useModal();
  const initialDropPhotoData = {
    photo: imageSrc,
    text: "or",
  };

  const [dropPhotoData, setDropPhotoData] = useState(initialDropPhotoData);
  const dispatch = useAppDispatch();

  const handleChange = (file: File) => {
    if (file) {
      setDropPhotoData(initialDropPhotoData);
      const formData = new FormData();
      formData.append("file", file);

      if (mode === "profile") {
        dispatch(fetchUpdateUserPhoto({ data: formData, token }));
      } else if (mode === "category") {
        if (tagId) {
          dispatch(fetchUpdateTagPhoto({ token, data: formData, tagId }));
        } else {
          throw new Error(`Something went wrong with tag id: ${tagId}`);
        }
      } else if (mode === "recipe main") {
        if (recipeId && tagId) {
          dispatch(
            fetchUpdateRecipeMainPhoto({
              data: formData,
              tagId,
              recipeId,
              token,
            })
          );
        } else {
          throw new Error(
            `Something went wrong with recipe id: ${recipeId} or with tag id: ${tagId}`
          );
        }
      } else if (mode === "recipe") {
        if (recipeId) {
          dispatch(
            fetchAddRecipePhoto({
              recipeId,
              token,
              data: formData,
            })
          );
        } else {
          throw new Error(
            `Custom error: something went wrong with recipe id: ${recipeId}`
          );
        }
      }

      toggle();
    } else {
      throw new Error("Something went wong with file...");
    }
  };

  const handleError = (error: "type" | "size") => {
    switch (error) {
      case "size":
        setDropPhotoData({
          photo: ScaleUpImage,
          text: "Your image is too big.\nChoose a smaller photo",
        });
        break;
      case "type":
        setDropPhotoData({
          photo: FolderImage,
          text: "Try a different file format.\nAllowed types: jpeg, jpg, png",
        });
        break;
      default:
        setDropPhotoData(initialDropPhotoData);
        break;
    }
  };

  return (
    <section className="add-profile-photo">
      <h3 className="add-profile-photo__header">Add {mode} photo</h3>
      <article className="add-profile-photo__content">
        <section className="add-photo">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            maxSize={fileSize}
            onTypeError={() => handleError("type")}
            onSizeError={() => handleError("size")}
          >
            <DropPhoto imageSrc={dropPhotoData.photo} />
          </FileUploader>
        </section>
        <span className="add-profile-photo__text">{dropPhotoData.text}</span>
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
            onTypeError={() => handleError("type")}
            onSizeError={() => handleError("size")}
          >
            <div className="add-profile-photo__upload">Upload picture</div>
          </FileUploader>
        </section>
      </article>
    </section>
  );
}
