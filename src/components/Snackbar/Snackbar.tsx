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

  setTimeout(() => {
    dispatch(SnackbarTextValue({ text: "", withUndo: false }));
  }, 10000);

  return (
    <aside className={`snackbar snackbar_${text.length > 0 ? "show" : "hide"}`}>
      <span className="snackbar__text">{text}</span>
      <section className="snackbar__btns">
        {/* TODO: remove false when undo will be done in server side */}
        {isUndoBtn && false && (
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
        {/* TODO: remove false and eslint comment when undo will be done in server side */}
        <button
          type="button"
          className={`snackbar__btn ${
            // eslint-disable-next-line no-constant-condition
            isUndoBtn && false
              ? "snackbar__btn_cross"
              : "snackbar__btn_cross-without-undo"
          }`}
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
