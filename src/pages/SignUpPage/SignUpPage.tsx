/* eslint-disable jsx-a11y/label-has-associated-control */

import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../components/Input/Input";
import { FormValues } from "../../types/types";

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
    const { nickname, email, password } = data;
    reset();
  };

  return (
    <main className="main">
      <article className="sign-page">
        <section className="sign-page__img-wrapper">
          <img src="" alt="" />
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
            />
            {signMode && (
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
              />
            )}
            <input type="submit" value={submitText()} />
          </form>
        </section>
      </article>
    </main>
  );
}
