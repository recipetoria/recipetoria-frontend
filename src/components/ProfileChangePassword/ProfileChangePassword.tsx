import { SubmitHandler, useForm } from "react-hook-form";
import "./ProfileChangePassword.scss";
import { useState } from "react";
import { FormValues } from "../../types/types";
import Input from "../Input/Input";
import checkUserPassword from "../../API/checkUserPassword";
import { useAppSelector } from "../../app/hooks";
import updateUserPassword from "../../API/updateUserPassword";

export default function ProfileChangePassword() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [passwordValue, setPasswordValue] = useState("");
  const [customError, setCustomError] = useState<boolean>();
  const token = useAppSelector((state) => state.present.authData.value.token);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { oldPassword, password, repeatPassword } = data;
    if (oldPassword) {
      const checkUserPasswordResponse = await checkUserPassword(
        token,
        oldPassword
      );
      if (!checkUserPasswordResponse) {
        setError("oldPassword", { message: "Wrong password" });
      } else if (password && repeatPassword) {
        if (oldPassword === password) {
          setError("password", {
            message: "The old password must not match the new password",
          });
        } else {
          updateUserPassword(password, token).then(() => {
            reset();
          });
        }
      }
    }
  };

  const errorsArr = [
    errors.oldPassword?.message,
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
                caption="Min 6 characters"
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
