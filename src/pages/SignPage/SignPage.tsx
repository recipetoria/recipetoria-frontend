/* eslint-disable jsx-a11y/label-has-associated-control */

import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ModalContentContext } from "../../contexts/ModalContentContext";
import ModalContentTextWithImg from "../../components/ModalContentTextWithImg/ModalContentTextWithImg";
import {
  isOpenModalMode,
  isOpenModalValue,
} from "../../features/IsOpenModalSlice";
import logOut from "../../API/logOut";

type SignMode = "signUp" | "signIn";

interface ISignPageProps {
  signMode: SignMode;
}

// TODO: something wrong with repeated password. Case: put password -> wrongly repeat password -> put email correct -> submit

export default function SignPage(props: ISignPageProps) {
  const { signMode } = props;

  const isAuth = useAppSelector((state) => state.present.authData.value.isAuth);
  const name = useAppSelector((state) => state.present.authData.value.name);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth === true) {
      logOut(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const [passwordValue, setPasswordValue] = useState("");
  const [customError, setCustomError] = useState<boolean>();
  const { setModalContent } = useContext(ModalContentContext);

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
        clearErrors();
        if (signMode === "signUp") {
          dispatch(isOpenModalValue(true));
          dispatch(isOpenModalMode("afterRegister"));
          setModalContent(<ModalContentTextWithImg />);
        }
      } else if (typeof signUpResult === "string") {
        switch (signUpResult) {
          case "User with this email already exists":
            setError("email", { message: signUpResult });
            break;

          case "User not authenticated. Please log in to continue":
            setError("email", {
              message: "A user with such an email address does not exist",
            });
            break;
          case "Bad credentials":
            setError("password", { message: "Invalid password" });
            break;

          default:
            clearErrors();
            break;
        }
      }
    }

    if (signMode === "signUp") {
      navIfSuccess(await signUp(nickname || "", email || "", password || ""));
    } else if (signMode === "signIn") {
      navIfSuccess(await SignIn(email || "", password || ""));
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
    clearErrors();
    reset();
  }

  return (
    <main className="main">
      <article className="sign-page">
        <div
          className={`sign-page__wrapper ${
            signMode === "signIn" ? "sign-page__wrapper_sign-in" : ""
          }`}
        >
          <section
            className={`sign-page__img-wrapper ${
              signMode === "signIn" ? "sign-page__img-wrapper_sign-in" : ""
            }`}
          >
            <img src={Image} alt="recipe and plate" />
          </section>
          <section className="sign-page__form-n-header">
            {signMode === "signUp" ? (
              <h3 className="sign-page__header">Welcome to Recipetoria!</h3>
            ) : (
              <div className="sign-page__headers">
                <h3 className="sign-page__header">
                  Welcome back{name ? "," : "!"}
                </h3>
                {name ? <h3 className="sign-page__header">{name}</h3> : ""}
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
                  caption="Max 30 characters"
                />
              )}
              <Input
                label="Email"
                name="email"
                type="text"
                register={register}
                errors={errors}
                required
                validationSchema={{
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a correct Email",
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
                caption={signMode === "signUp" ? "Min 6 characters" : ""}
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
                    ? "Agree to Terms & Conditions"
                    : "Remember me"
                }
                register={register}
                errors={errors}
                required={signMode === "signUp"}
                type="checkbox"
                placeholder=""
                disabled={signMode === "signIn"}
              />
              <article className="sign-social">
                <span className="sign-social__text">or sign up with</span>
                <section className="icons">
                  <a
                    href="https://www.google.com/"
                    className="disabled-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <GoogleIcon disabled />
                  </a>
                  <a
                    href="https://twitter.com/"
                    className="disabled-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <TwitterIcon disabled />
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    className="disabled-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <FacebookIcon disabled />
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
