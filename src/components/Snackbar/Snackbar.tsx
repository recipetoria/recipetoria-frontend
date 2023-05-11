import { ActionCreators as UndoActionCreators } from "redux-undo";
import CrossIcon from "../../assets/svg/CrossIcon";
import "./Snackbar.scss";
import { useAppDispatch } from "../../app/hooks";

export default function Snackbar(props: { text: string }) {
  const { text } = props;
  const dispatch = useAppDispatch();

  return (
    <aside className="snackbar">
      <span className="snackbar__text">{text}</span>
      <section className="snackbar__btns">
        <button
          type="button"
          className="snackbar__btn snackbar__btn_undo"
          onClick={() => {
            dispatch(UndoActionCreators.undo());
          }}
        >
          Undo
        </button>
        <button type="button" className="snackbar__btn snackbar__btn_cross">
          <CrossIcon />
        </button>
      </section>
    </aside>
  );
}
