import { SubmitHandler, useForm } from "react-hook-form";
import "./ProfileGeneral.scss";
import { ReactNode, useState } from "react";
import DefaultAvatar from "../../assets/png/default_ava.png";
import Input from "../Input/Input";
import { FormValues, UserInfo } from "../../types/types";
import AddProfilePhoto from "../AddProfilePhoto/AddProfilePhoto";
import { useAppSelector } from "../../app/hooks";
import getUserInfo from "../../API/getUserInfo";
import updateUserNameAndEmail from "../../API/updateUserNameAndEmail";
import getPhotoFromBytes from "../../utils/getPhotoFromBytes";

interface ProfileGeneralProps {
  toggle: () => void;
  modalChildren: (child: ReactNode) => void;
}

export default function ProfileGeneral(props: ProfileGeneralProps) {
  const { toggle, modalChildren } = props;
  const token = useAppSelector((state) => state.present.authData.value.token);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    name: "",
    photo: "",
    password: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { nickname, email } = data;
    if (email && nickname) {
      updateUserNameAndEmail(email, nickname, token);
    }
  };

  const errorsArr = [errors.email?.message, errors.nickname?.message]
    .filter((item) => item !== undefined)
    .filter((item) => item);

  function usersEquals(oldUserInfo: UserInfo, newUserInfo: UserInfo) {
    return (
      oldUserInfo.email === newUserInfo.email &&
      oldUserInfo.name === newUserInfo.name
    );
  }

  try {
    getUserInfo(token).then((value) =>
      usersEquals(userInfo, value) ? value : setUserInfo(value)
    );
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error(`Unexpected error: ${err}`);
    }
  }

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

  return (
    <article className="profile-general">
      <form onSubmit={handleSubmit(onSubmit)} className="profile-general__form">
        <section className="general">
          <div className="general__wrapper">
            <span className="general__header">General</span>
            <section className="general__avatar-n-btn">
              <div className="general__avatar-wrapper">
                <img
                  src={srcUserPhoto}
                  alt="avatar"
                  className="default-avatar"
                />
              </div>
              <div className="general__btn-n-caption">
                <button
                  type="button"
                  className="general__btn btn"
                  onClick={() => {
                    toggle();
                    modalChildren(<AddProfilePhoto />);
                  }}
                >
                  Replace picture
                </button>
                <span className="general__caption">
                  Allowed types: jpeg, jpg or png Maximum file size is 5 MB
                </span>
              </div>
            </section>
            <div className="general__fields">
              <Input
                name="nickname"
                label="Nickname"
                type="text"
                register={register}
                errors={errors}
                required
                validationSchema={{
                  required: "New nickname is required",
                  minLength: {
                    value: 3,
                    message: "Please enter a minimum of 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Please enter a maximum of 30 characters",
                  },
                }}
                placeholder="Enter your text here"
                caption="Max 30 symbols"
                defaultValue={userInfo.name}
              />
              <Input
                name="email"
                label="E-mail"
                type="text"
                register={register}
                errors={errors}
                required
                validationSchema={{
                  required: "New e-mail is required",
                  pattern: {
                    value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a correct e-mail",
                  },
                }}
                placeholder="example@gmail.com"
                defaultValue={userInfo.email}
              />
            </div>
          </div>
        </section>
        <section>
          <input
            type="submit"
            value="Save changes"
            className="profile-general__submit-btn"
            disabled={errorsArr.length !== 0}
          />
        </section>
      </form>
    </article>
  );
}
