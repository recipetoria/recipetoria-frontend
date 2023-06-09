import { useAppSelector } from "../../app/hooks";
import DefaultAvatar from "../../assets/png/default_ava.png";
import getPhotoFromBytes from "../../utils/getPhotoFromBytes";

export default function UserPhoto() {
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

  return <img src={srcUserPhoto} alt="avatar" className="default-avatar" />;
}
