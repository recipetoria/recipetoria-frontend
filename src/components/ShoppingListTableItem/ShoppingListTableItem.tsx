import { useState } from "react";
import Trash from "../../assets/svg/Trash";
import "./ShoppingListTableItem.scss";

/* eslint-disable jsx-a11y/control-has-associated-label */

interface IShoppingListTableItem {
  id: number;
  name: string;
  amount: number;
  isLined: boolean;
}

export default function ShoppingListTableItem(props: IShoppingListTableItem) {
  const { id, name, amount, isLined } = props;
  const [isClicked, setClick] = useState("");
  const [valueId, setValueId] = useState<number>();
  const [valueName, setValueName] = useState<string>();
  const [valueAmount, setValueAmount] = useState<number>();

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
        <select name="measure" className="select">
          <option value="table spoon">table spoon</option>
          <option value="gram">gram</option>
          <option value="kilogram">kilogram</option>
          <option value="ounce">ounce</option>
          <option value="pound">pound</option>
          <option value="pack">pack</option>
          <option value="box">box</option>
          <option value="bottle">bottle</option>
          <option value="tea spoon">tea spoon</option>
          <option value="glass">glass</option>
        </select>
      </div>
      <div className={`td-trash td ${isLined ? "td__with-line" : ""}`}>
        <Trash />
      </div>
    </>
  );
}
