import { ActionCreators as UndoActionCreators } from "redux-undo";
import CrossIcon from "../../assets/svg/CrossIcon";
import "./Snackbar.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";
import { addIngredient } from "../../features/ShopListSlice";

export default function Snackbar() {
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.present.snackbarTextSlice.value);
  const shopListPastArray = [
    ...useAppSelector((state) => state.past.map((item) => item.shopList.value)),
  ].at(-1);
  const shopListPresentArray = [
    ...useAppSelector((state) => state.present.shopList.value),
  ];

  return (
    <aside className={`snackbar snackbar_${text.length > 0 ? "show" : "hide"}`}>
      <span className="snackbar__text">{text}</span>
      <section className="snackbar__btns">
        <button
          type="button"
          className="snackbar__btn snackbar__btn_undo"
          onClick={() => {
            const pastShopEl = shopListPastArray?.filter(
              (i) => shopListPresentArray.indexOf(i) === -1
            )[0];

            dispatch(UndoActionCreators.undo());
            dispatch(SnackbarTextValue(""));
            if (pastShopEl) dispatch(addIngredient(pastShopEl));
          }}
        >
          Undo
        </button>
        <button
          type="button"
          className="snackbar__btn snackbar__btn_cross"
          onClick={() => dispatch(SnackbarTextValue(""))}
        >
          <CrossIcon />
        </button>
      </section>
    </aside>
  );
}
