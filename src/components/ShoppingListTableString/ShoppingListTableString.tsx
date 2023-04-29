import { useState } from "react";
import Trash from "../../assets/svg/Trash";
import "./ShoppingListTableString.scss";
import customArrow from "../../assets/png/icon-up.png";
import measureValues from "../../assets/data/measureArray";
import ShoppingListTableItem from "./ShoppingListTableItem";

/* eslint-disable jsx-a11y/control-has-associated-label */

interface IShoppingListTableString {
  id: number;
  name: string;
  amount: number;
  measureDefault: string;
  isLined: boolean;
}

export default function ShoppingListTableString(
  props: IShoppingListTableString
) {
  const { id, name, amount, measureDefault, isLined } = props;
  const [isClicked, setClick] = useState("");
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
      <ShoppingListTableItem
        isLined={isLined}
        defaultValue={id}
        classMode="td__button_id"
      />
      <ShoppingListTableItem
        isLined={isLined}
        defaultValue={name}
        classMode="td__button_name"
      />
      <ShoppingListTableItem
        isLined={isLined}
        defaultValue={amount}
        classMode="td__button_amount"
      />
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
