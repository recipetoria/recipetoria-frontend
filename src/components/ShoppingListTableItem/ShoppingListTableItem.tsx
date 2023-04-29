import { useState } from "react";
import Trash from "../../assets/svg/Trash";
import "./ShoppingListTableItem.scss";
import customArrow from "../../assets/png/icon-up.png";
import measureValues from "../../assets/data/measureArray";

/* eslint-disable jsx-a11y/control-has-associated-label */

interface IShoppingListTableItem {
  id: number;
  name: string;
  amount: number;
  measureDefault: string;
  isLined: boolean;
}

export default function ShoppingListTableItem(props: IShoppingListTableItem) {
  const { id, name, amount, measureDefault, isLined } = props;
  const [isClicked, setClick] = useState("");
  const [valueId, setValueId] = useState<number>();
  const [valueName, setValueName] = useState<string>();
  const [valueAmount, setValueAmount] = useState<number>();
  const [valueMeasure, setValueMeasure] = useState<string>(measureDefault);

  const measuresList = measureValues
    .filter((el) => el !== valueMeasure)
    .map((item) => (
      <button
        type="button"
        className="options__list-el"
        key={item}
        onClick={() => {
          setClick("");
          setValueMeasure(item);
        }}
      >
        {item}
      </button>
    ));

  return (
    <>
      <div className={`td-id td ${isLined ? "td__with-line" : ""}`}>
        {isClicked === "id" ? (
          <input
            type="number"
            defaultValue={valueId || id}
            className="td__input"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setValueId(+e.currentTarget.value);
                setClick("");
              }
            }}
            onBlur={(e) => {
              setValueId(+e.currentTarget.value);
              setClick("");
            }}
          />
        ) : (
          <button
            type="button"
            className="td__button"
            onClick={() => setClick("id")}
          >
            {valueId || id}
          </button>
        )}
      </div>
      <div className={`td-name td ${isLined ? "td__with-line" : ""}`}>
        {isClicked === "name" ? (
          <textarea
            defaultValue={valueName || name}
            className="td__input"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setValueName(e.currentTarget.value);
                setClick("");
              }
            }}
            onBlur={(e) => {
              setValueName(e.currentTarget.value);
              setClick("");
            }}
          />
        ) : (
          <button
            type="button"
            className="td__button"
            onClick={() => setClick("name")}
          >
            {valueName || name}
          </button>
        )}
      </div>
      <div className={`td-amount td ${isLined ? "td__with-line" : ""}`}>
        {isClicked === "amount" ? (
          <input
            type="number"
            defaultValue={valueAmount || amount}
            className="td__input"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setValueAmount(+e.currentTarget.value);
                setClick("");
              }
            }}
            onBlur={(e) => {
              setValueAmount(+e.currentTarget.value);
              setClick("");
            }}
          />
        ) : (
          <button
            type="button"
            className="td__button"
            onClick={() => setClick("amount")}
          >
            {valueAmount || amount}
          </button>
        )}
      </div>
      <div className={`td-select td ${isLined ? "td__with-line" : ""}`}>
        <button
          type="button"
          className="td__button td__button_with-arrow"
          onClick={() =>
            isClicked === "measure" ? setClick("") : setClick("measure")
          }
        >
          {valueMeasure}
          <img
            src={customArrow}
            alt="arrow"
            className={isClicked === "measure" ? "arrow-up" : "arrow-down"}
          />
        </button>
        {isClicked === "measure" ? (
          <div className="options">
            <div className="options__list">{measuresList}</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={`td-trash td ${isLined ? "td__with-line" : ""}`}>
        <button type="button" className="td__button" onClick={() => {}}>
          <Trash />
        </button>
      </div>
    </>
  );
}
