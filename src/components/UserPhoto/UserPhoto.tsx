import { useAppSelector } from "../../app/hooks";
import DefaultAvatar from "../../assets/png/default_ava.png";
import getPhotoFromBytes from "../../utils/getPhotoFromBytes";
import "./UserPhoto.scss";

type Parent = "Header" | "Profile";

export default function UserPhoto(props: { parent: Parent }) {
  const { parent } = props;

  const userPhoto = useAppSelector((state) => state.present.userPhoto.value);
  const userPhotoError = useAppSelector(
    (state) => state.present.userPhoto.error
  );

  let srcUserPhoto = DefaultAvatar;

  if (userPhoto !== "") {
    srcUserPhoto = getPhotoFromBytes(userPhoto);
  } else if (userPhotoError) {
    srcUserPhoto = DefaultAvatar;
  }

  let imageClassMode = "";

  if (srcUserPhoto === DefaultAvatar && parent === "Profile") {
    imageClassMode = "avatar__image_default_profile";
  } else if (srcUserPhoto === DefaultAvatar) {
    imageClassMode = "avatar__image_default";
  } else if (parent === "Profile") {
    imageClassMode = "avatar__image_profile";
  }

  return (
    <div className={`avatar ${parent === "Profile" && "avatar_profile"}`}>
      <img
        src={srcUserPhoto}
        alt="avatar"
        className={`avatar__image ${imageClassMode}`}
      />
    </div>
  );
}
