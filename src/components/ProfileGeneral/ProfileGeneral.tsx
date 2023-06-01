import { SubmitHandler, useForm } from "react-hook-form";
import "./ProfileGeneral.scss";
import { ReactNode } from "react";
import DefaultAvatar from "../../assets/png/default_ava.png";
import Input from "../Input/Input";
import { FormValues } from "../../types/types";
import AddProfilePhoto from "../AddProfilePhoto/AddProfilePhoto";

interface ProfileGeneralProps {
  toggle: () => void;
  modalChildren: (child: ReactNode) => void;
}

export default function ProfileGeneral(props: ProfileGeneralProps) {
  const { toggle, modalChildren } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { nickname, email } = data;
  };

  const errorsArr = [errors.email?.message, errors.nickname?.message]
    .filter((item) => item !== undefined)
    .filter((item) => item);

  return (
    <article className="profile-general">
      <form onSubmit={handleSubmit(onSubmit)} className="profile-general__form">
        <section className="general">
          <div className="general__wrapper">
            <span className="general__header">General</span>
            <section className="general__avatar-n-btn">
              <div className="general__avatar-wrapper">
                <img src={DefaultAvatar} alt="" className="default-avatar" />
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
                  required: "Nickname is required",
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
              />
              <Input
                name="email"
                label="E-mail"
                type="text"
                register={register}
                errors={errors}
                required
                validationSchema={{
                  required: "E-mail is required",
                  pattern: {
                    value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a correct e-mail",
                  },
                }}
                placeholder="example@gmail.com"
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
