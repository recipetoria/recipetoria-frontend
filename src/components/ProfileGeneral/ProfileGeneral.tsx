import { SubmitHandler, useForm } from "react-hook-form";
import "./ProfileGeneral.scss";
import { ReactNode, useState } from "react";
import Input from "../Input/Input";
import { FormValues, UserInfo } from "../../types/types";
import AddProfilePhoto from "../AddProfilePhoto/AddProfilePhoto";
import { useAppSelector } from "../../app/hooks";
import getUserInfo from "../../API/getUserInfo";
import updateUserName from "../../API/updateUserName";
import UserPhoto from "../UserPhoto/UserPhoto";

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
    const { nickname } = data;
    if (nickname) {
      updateUserName(nickname, token);
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

  return (
    <article className="profile-general">
      <form onSubmit={handleSubmit(onSubmit)} className="profile-general__form">
        <section className="general">
          <div className="general__wrapper">
            <span className="general__header">General</span>
            <section className="general__avatar-n-btn">
              <UserPhoto parent="Profile" />
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
                  required: "New new nickname is required",
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
