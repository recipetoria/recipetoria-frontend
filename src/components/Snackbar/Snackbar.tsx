import "./Snackbar.scss";

export default function Snackbar(props: { text: string }) {
  const { text } = props;

  return (
    <aside className="snackbar">
      <span className="snackbar__text">{text}</span>
    </aside>
  );
}
