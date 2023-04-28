import { useState } from "react";
import { IShoppingListItems } from "../../types/types";
import ShoppingListTableItem from "../ShoppingListTableItem/ShoppingListTableItem";
import "./ShoppingListTable.scss";
import customArrow from "../../assets/png/icon-up.png";
import Trash from "../../assets/svg/Trash";
import measureValues from "../../assets/data/measureArray";

export default function ShoppingListTable() {
  const shoppingItems: IShoppingListItems[] = [
    { id: 232, name: "Super long name of Item", amount: 25.302 },
    { id: 23, name: "Super long name of Item", amount: 2502 },
    {
      id: 223,
      name: "Super long name of Item and one more super long",
      amount: 3.342,
    },
    {
      id: 123,
      name: "Super long name of Item Super long name of Item one more super long",
      amount: 12,
    },
    {
      id: 321,
      name: "Super long name of Item",
      amount: 2,
    },
  ];

  const [isHover, setHover] = useState(false);
  const [isClicked, setClick] = useState<string>();
  const [valueMeasure, setValueMeasure] = useState<string>("select");
  const [isClickedSelect, setClickedSelect] = useState(false);

  const measuresList = measureValues
    .filter((el) => el !== valueMeasure)
    .map((item) => (
      <button
        type="button"
        className="options__list-el"
        key={item}
        onClick={() => {
          setClickedSelect(false);
          setValueMeasure(item);
        }}
      >
        {item}
      </button>
    ));

  const shoppingItemsJSX = shoppingItems.map((item, index) => (
    <ShoppingListTableItem
      id={item.id}
      name={item.name}
      amount={item.amount}
      key={item.id}
      isLined={index !== shoppingItems.length - 1}
    />
  ));

  return (
    <div className="shopping-list-table">
      <article className="table">
        <div className="table__head">#</div>
        <div className="table__head">Name</div>
        <div className="table__head">Amount</div>
        <div className="table__head">Measure</div>
        <div className="table__head">Delete</div>
        {shoppingItemsJSX}
        {isClicked === "newString" ? (
          <>
            <button type="button" className="td__button">
              {shoppingItems.length + 1}
            </button>
            <form>
              <textarea className="td__input" />
            </form>
            <form>
              <input type="number" className="td__input" />
            </form>
            <div className="td-select td">
              <button
                type="button"
                className="td__button td__button_with-arrow"
                onClick={() =>
                  isClickedSelect
                    ? setClickedSelect(false)
                    : setClickedSelect(true)
                }
              >
                {valueMeasure}
                <img
                  src={customArrow}
                  alt="arrow"
                  className={isClickedSelect ? "arrow-up" : "arrow-down"}
                />
              </button>
              {isClickedSelect ? (
                <div className="options">
                  <div className="options__list">{measuresList}</div>
                </div>
              ) : (
                ""
              )}
            </div>
            <button type="button" className="td__button" onClick={() => {}}>
              <Trash />
            </button>
          </>
        ) : (
          ""
        )}
      </article>
      <div
        className={`empty-string-on-hover_${isHover}`}
        onMouseOut={() => {
          setHover(false);
        }}
        onBlur={() => {}}
      >
        <button
          type="button"
          aria-label="Empty string"
          className="empty-string-on-hover_true__button"
          onClick={() => setClick("newString")}
        />
      </div>
      <button
        type="button"
        className="shopping-list-table__add-btn"
        onMouseOver={() => {
          setHover(true);
        }}
        onFocus={() => {}}
      >
        <span className="shopping-list-table__add-btn-plus">+</span>
        <span className="shopping-list-table__add-btn-text">Add new item</span>
      </button>
    </div>
  );
}
