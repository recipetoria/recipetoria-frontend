import "./Snackbar.scss";

export default function Snackbar(props: { text: string }) {
  const { text } = props;

  return (
    <aside className="snackbar">
      <span className="snackbar__text">{text}</span>
      <section className="snackbar__btns">
        <button type="button">Undo</button>
        <button type="button">+</button>
      </section>
    </aside>
  );
}
