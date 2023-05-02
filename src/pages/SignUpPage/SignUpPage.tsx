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
    console.log(data);
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
          <form onSubmit={(e) => {
            handleSubmit(onSubmit);
          }}>
            <Input
              label="Nickname"
              name="nickname"
              type="text"
              register={register}
              errors={errors}
              required
              validationSchema={{
                required: "Todo deadline is required",
                minLength: {
                  value: 3,
                  message: "Please enter a minimum of 3 characters",
                },
              }}
            />
            <button type="submit">{submitText()}</button>
          </form>
        </section>
      </article>
    </main>
  );
}
