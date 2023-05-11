import CrossIcon from "../../assets/svg/CrossIcon";
import "./Snackbar.scss";

export default function Snackbar(props: { text: string }) {
  const { text } = props;

  return (
    <aside className="snackbar">
      <span className="snackbar__text">{text}</span>
      <section className="snackbar__btns">
        <button type="button" className="snackbar__btn snackbar__btn_undo">
          Undo
        </button>
        <button type="button" className="snackbar__btn snackbar__btn_cross">
          <CrossIcon />
        </button>
      </section>
    </aside>
  );
}
