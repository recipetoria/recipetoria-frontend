import { ActionCreators as UndoActionCreators } from "redux-undo";
import CrossIcon from "../../assets/svg/CrossIcon";
import "./Snackbar.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";

export default function Snackbar() {
  const dispatch = useAppDispatch();
  const text = useAppSelector(
    (state) => state.present.snackbarTextSlice.value.text
  );
  const isUndoBtn = useAppSelector(
    (state) => state.present.snackbarTextSlice.value.withUndo
  );

  return (
    <aside className={`snackbar snackbar_${text.length > 0 ? "show" : "hide"}`}>
      <span className="snackbar__text">{text}</span>
      <section className="snackbar__btns">
        {isUndoBtn && (
          <button
            type="button"
            className="snackbar__btn snackbar__btn_undo"
            onClick={() => {
              dispatch(UndoActionCreators.undo());
              dispatch(SnackbarTextValue({ text: "", withUndo: false }));
            }}
          >
            Undo
          </button>
        )}
        <button
          type="button"
          className={`snackbar__btn ${isUndoBtn && "snackbar__btn_cross"}`}
          onClick={() =>
            dispatch(SnackbarTextValue({ text: "", withUndo: false }))
          }
        >
          <CrossIcon color="#F4EFF4" />
        </button>
      </section>
    </aside>
  );
}
