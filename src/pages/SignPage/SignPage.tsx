/* eslint-disable jsx-a11y/label-has-associated-control */

import {
  useForm,
  SubmitHandler,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form";
import { Link } from "react-router-dom";
import {
  FacebookIcon,
  GoogleIcon,
  TwitterIcon,
} from "../../assets/svg/social-icons";
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

  const errorsArr = [
    errors.checkbox?.message,
    errors.email?.message,
    errors.nickname?.message,
    errors.password?.message,
    errors.repeatPassword?.message,
    errors.root?.message,
  ].filter((item) => item !== undefined);

  return (
    <main className="main">
      <article className="sign-page">
        <div className="sign-page__wrapper">
          <section className="sign-page__img-wrapper">
            <img src={Image} alt="recipe and plate" />
          </section>
          <section className="sign-page__form-n-header">
            {signMode === "signUp" ? (
              <h3 className="sign-page__header">Welcome to Reciptopedia!</h3>
            ) : (
              <div className="sign-page__headers">
                <h3 className="sign-page__header">Welcome back!</h3>
                <h3 className="sign-page__header">Michael</h3>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="sign-page__form">
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
                  caption="Max 30 symbols"
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
                    value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a correct e-mail",
                  },
                }}
                placeholder="example@gmail.com"
              />
              <Input
                label="Password"
                name="password"
                type="password"
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
                caption="Minimum 6 characters"
              />
              {signMode === "signUp" && (
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
                  placeholder="Repeat password"
                />
              )}
              <input
                type="submit"
                value={submitText()}
                className="submit-btn btn"
                disabled={errorsArr.length !== 0}
              />
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
              <article className="sign-social">
                <span className="sign-social__text">or sign up with</span>
                <section className="icons">
                  <a href="https://www.google.com/">
                    <GoogleIcon />
                  </a>
                  <a href="https://twitter.com/">
                    <TwitterIcon />
                  </a>
                  <a href="https://www.facebook.com/">
                    <FacebookIcon />
                  </a>
                </section>
              </article>
              <section className="switch-block">
                {signMode === "signUp" ? (
                  <>
                    <span className="switch-block__text">
                      Already have an account?
                    </span>
                    <Link to="/sign_in" className="switch-block__link">
                      Sign in
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="switch-block__text">
                      Create a new account?
                    </span>
                    <Link to="/sign_up" className="switch-block__link">
                      Sign up
                    </Link>
                  </>
                )}
              </section>
            </form>
          </section>
        </div>
      </article>
    </main>
  );
}
