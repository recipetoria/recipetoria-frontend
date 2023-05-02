/* eslint-disable jsx-a11y/label-has-associated-control */

type SignMode = "signUp" | "signIn";

interface ISignPageProps {
  signMode: SignMode;
}

export default function SignPage(props: ISignPageProps) {
  const { signMode } = props;

  return (
    <main className="main">
      <article className="sign-page">
        <section className="sign-page__img-wrapper">
          <img src="" alt="" />
        </section>
        <section className="sign-page__form-n-header">
          <h2>Welcome to Reciptopedia</h2>
          <form>
            <label htmlFor="nickname">Nickname</label>
            <input type="text" id="nickname" />
          </form>
        </section>
      </article>
    </main>
  );
}
