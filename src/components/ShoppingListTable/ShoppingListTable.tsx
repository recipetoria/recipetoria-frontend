/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { IShoppingListItems } from "../../types/types";
import ShoppingListTableItem from "../ShoppingListTableString/ShoppingListTableString";
import "./ShoppingListTable.scss";

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

  const shoppingItemsJSX = shoppingItems.map((item, index) => (
    <ShoppingListTableItem
      id={item.id}
      name={item.name}
      amount={item.amount}
      measureDefault="table spoon"
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
          <ShoppingListTableItem
            id={shoppingItems.length + 1}
            name=""
            amount={0}
            measureDefault="select"
            isLined={false}
          />
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
          onClick={() => {
            setHover(false);
            setClick("newString");
          }}
        />
      </div>
      {isClicked === "newString" ? (
        ""
      ) : (
        <button
          type="button"
          className="shopping-list-table__add-btn"
          onMouseOver={() => {
            setHover(true);
          }}
          onFocus={() => {}}
        >
          <span className="shopping-list-table__add-btn-plus">+</span>
          <span className="shopping-list-table__add-btn-text">
            Add new item
          </span>
        </button>
      )}
    </div>
  );
}
