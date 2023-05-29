import { SubmitHandler, useForm } from "react-hook-form";
import "./ProfileChangePassword.scss";
import { useState } from "react";
import { FormValues } from "../../types/types";
import Input from "../Input/Input";

export default function ProfileChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [passwordValue, setPasswordValue] = useState("");
  const [customError, setCustomError] = useState<boolean>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { nickname, email } = data;
  };

  const errorsArr = [
    errors.password?.message,
    errors.repeatPassword?.message,
    customError,
  ]
    .filter((item) => item !== undefined)
    .filter((item) => item);

  return (
    <article className="profile-change-password">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="profile-change-password__form"
      >
        <section className="change-password">
          <div className="change-password__wrapper">
            <span className="change-password__header">Change password</span>
            <div className="change-password__fields">
              <Input
                name="oldPassword"
                label="Old Password"
                register={register}
                errors={errors}
                required
                type="password"
                placeholder="Enter old password"
                validationSchema={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Please enter a minimum of 6 characters",
                  },
                }}
                caption="Minimum 6 characters"
              />
              <Input
                name="password"
                label="New password"
                register={register}
                errors={errors}
                required
                type="password"
                placeholder="Enter new password"
                validationSchema={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Please enter a minimum of 6 characters",
                  },
                }}
                caption="Minimum 6 characters"
                updateData={(value: string) => setPasswordValue(value)}
              />
              <Input
                label="Repeat password"
                name="repeatPassword"
                type="password"
                register={register}
                errors={errors}
                required
                validationSchema={{
                  required: "Repeat password is required",
                }}
                placeholder="Enter new password"
                passwordValue={passwordValue}
                updateCustomError={(value: boolean) => setCustomError(value)}
                caption="Minimum 6 characters"
              />
            </div>
          </div>
        </section>
        <section>
          <input
            type="submit"
            value="Save changes"
            className="profile-change-password__submit-btn"
            disabled={errorsArr.length !== 0}
          />
        </section>
      </form>
    </article>
  );
}
