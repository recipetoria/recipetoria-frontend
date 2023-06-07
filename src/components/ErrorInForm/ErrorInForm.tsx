import "./ErrorInForm.scss";

export default function ErrorInForm(props: { errorMessage: string }) {
  const { errorMessage } = props;
  return <span className="error-in-form">{`${errorMessage}...`}</span>;
}
