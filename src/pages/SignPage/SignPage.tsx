/* eslint-disable jsx-a11y/label-has-associated-control */

import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  GoogleIcon,
  TwitterIcon,
} from "../../assets/svg/social-icons";
import Input from "../../components/Input/Input";
import { FormValues } from "../../types/types";
import "./SignPage.scss";
import Image from "../../assets/png/bg_img.png";
import signUp from "../../API/sighUp";
import SignIn from "../../API/signIn";
import { useAppSelector } from "../../app/hooks";
import ErrorInForm from "../../components/ErrorInForm/ErrorInForm";

type SignMode = "signUp" | "signIn";

interface ISignPageProps {
  signMode: SignMode;
}

export default function SignPage(props: ISignPageProps) {
  const { signMode } = props;

  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === true) {
      navigate("/*");
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [passwordValue, setPasswordValue] = useState("");
  const [customError, setCustomError] = useState<boolean>();
  const name = useAppSelector((state) => state.present.authData.value.name);
  const [error, setError] = useState("");

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { nickname, email, password } = data;

    function navIfSuccess(signUpResult: number | string) {
      if (signUpResult === 200 || signUpResult === 201) {
        navigate("/");
        reset();
        setError("");
      } else if (typeof signUpResult === "string") setError(signUpResult);
    }

    if (signMode === "signUp") {
      navIfSuccess(await signUp(nickname || "", email || "", password || ""));
    } else if (signMode === "signIn") {
      navIfSuccess(await SignIn(email || "", password || "", name));
    }
  };

  const errorsArr = [
    errors.checkbox?.message,
    errors.email?.message,
    errors.nickname?.message,
    errors.password?.message,
    errors.repeatPassword?.message,
    errors.root?.message,
    customError,
  ]
    .filter((item) => item !== undefined)
    .filter((item) => item);

  function handleClickToLink() {
    setError("");
    reset();
  }

  return (
    <main className="main">
      <article className="sign-page">
        <div className="sign-page__wrapper">
          <section className="sign-page__img-wrapper">
            <img src={Image} alt="recipe and plate" />
          </section>
          <section className="sign-page__form-n-header">
            {signMode === "signUp" ? (
              <h3 className="sign-page__header">Welcome to Reciptoria!</h3>
            ) : (
              <div className="sign-page__headers">
                <h3 className="sign-page__header">Welcome back!</h3>
                {name ? <h3 className="sign-page__header">{name}</h3> : ""}
              </div>
            )}
            {error !== "" && <ErrorInForm errorMessage={error} />}
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
                    value: signMode === "signUp" ? 6 : 0,
                    message: "Please enter a minimum of 6 characters",
                  },
                }}
                placeholder="Enter password"
                caption={signMode === "signUp" ? "Minimum 6 characters" : ""}
                updateData={(value: string) => setPasswordValue(value)}
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
                  placeholder="Enter password"
                  passwordValue={passwordValue}
                  updateCustomError={(value: boolean) => setCustomError(value)}
                />
              )}
              <input
                type="submit"
                value={submitText()}
                className="submit-btn"
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
                required={signMode === "signUp"}
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
            </form>
            <section className="switch-block">
              {signMode === "signUp" ? (
                <>
                  <span className="switch-block__text">
                    Already have an account?
                  </span>
                  <Link
                    to="/sign_in"
                    className="switch-block__link"
                    onClick={() => handleClickToLink()}
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  <span className="switch-block__text">
                    Create a new account?
                  </span>
                  <Link
                    to="/sign_up"
                    className="switch-block__link"
                    onClick={() => handleClickToLink()}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </section>
          </section>
        </div>
      </article>
    </main>
  );
}
