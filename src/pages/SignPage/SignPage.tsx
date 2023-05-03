/* eslint-disable jsx-a11y/label-has-associated-control */

import {
  useForm,
  SubmitHandler,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import { FormValues } from "../../types/types";
import "./SignPage.scss";
import Image from "../../assets/png/bg_img.png";

type SignMode = "signUp" | "signIn";

interface ISignPageProps {
  signMode: SignMode;
}

export default function SignPage(props: ISignPageProps) {
  const { signMode } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const submitText = () => {
    let text = "";
    if (signMode === "signUp") {
      text = "Get started";
    }
    if (signMode === "signIn") {
      text = "Sign in";
    }
    return text;
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { nickname, email, password, checkbox } = data;
    reset();
  };

  return (
    <main className="main">
      <article className="sign-page">
        <section className="sign-page__img-wrapper">
          <img src={Image} alt="recipe and plate" />
        </section>
        <section className="sign-page__form-n-header">
          <h2>Welcome to Reciptopedia</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {signMode === "signUp" && (
              <Input
                label="Nickname"
                name="nickname"
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
              />
            )}
            <Input
              label="E-mail"
              name="email"
              type="text"
              register={register}
              errors={errors}
              required
              validationSchema={{
                required: "E-mail is required",
                pattern: {
                  value:
                    /[A-Za-z0-9/,.;-]{5,}\\b.+?[A-Za-z0-9/,.;-]{5,}\\b.+?[A-Za-z0-9/,.;-]{5,}/,
                  message: "Please enter a correct e-mail",
                },
              }}
              placeholder="example@gmail.com"
            />
            <Input
              label="Password"
              name="password"
              type="text"
              register={register}
              errors={errors}
              required
              validationSchema={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Please enter a minimum of 6 characters",
                },
              }}
              placeholder="Enter password"
            />
            {signMode === "signUp" && (
              <Input
                label="Repeat password"
                name="password"
                type="text"
                register={register}
                errors={errors}
                required
                validationSchema={{
                  required: "Repeat password is required",
                }}
                placeholder="Enter password"
              />
            )}
            <input type="submit" value={submitText()} />
            <Input
              name="checkbox"
              label={
                signMode === "signUp"
                  ? "Agree to terms & conditions"
                  : "Remember me"
              }
              register={register}
              errors={errors}
              required
              type="checkbox"
              placeholder=""
            />
            <span>or sign up with</span>
            <section className="icons__wrapper">
              <img src="" alt="google icon" />
              <img src="" alt="twitter icon" />
              <img src="" alt="facebook icon" />
            </section>
            <section className="switch-block">
              {signMode === "signUp" ? (
                <>
                  <span>Already have an account?</span>
                  <Link to="/sign_in">Sign in</Link>
                </>
              ) : (
                <>
                  <span>Create a new account?</span>
                  <Link to="/sign_up">Sign up</Link>
                </>
              )}
            </section>
          </form>
        </section>
      </article>
    </main>
  );
}
