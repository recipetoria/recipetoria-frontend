/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import ShoppingListTableString from "../ShoppingListTableString/ShoppingListTableString";
import "./ShoppingListTable.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { shopListNewStringValue } from "../../features/ShopListNewStringSlice";
import { fetchIngredients } from "../../features/ShopListSlice";

export default function ShoppingListTable() {
  const [isHover, setHover] = useState(false);
  const [activeSelect, setActiveSelect] = useState<number>(0);
  const isNewString = useAppSelector(
    (state) => state.present.shopListNewStringSlice.value
  );
  const token = useAppSelector((state) => state.present.authData.value.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients(token));
  }, [dispatch, token]);

  const shoppingItems = useAppSelector((state) => state.present.shopList.value);

  const shoppingItemsJSX = [...shoppingItems]
    .sort((a, b) => a.id - b.id)
    .map((item, index) => (
      <ShoppingListTableString
        id={item.id}
        name={item.name}
        amount={item.amount}
        measureDefault={item.measurementUnit}
        key={item.id}
        isLined={index !== shoppingItems.length - 1}
        editMode="edit"
        setActiveSelect={(id: number) => setActiveSelect(id)}
        isActiveSelect={activeSelect === item.id}
        number={index + 1}
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
        {isNewString ? (
          <ShoppingListTableString
            id={shoppingItems.length + 1}
            name=""
            amount={0}
            measureDefault="select"
            isLined={false}
            editMode="new"
            setActiveSelect={(id: number) => setActiveSelect(id)}
            isActiveSelect={activeSelect === shoppingItems.length + 1}
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
            dispatch(shopListNewStringValue(true));
          }}
        />
      </div>
      {isNewString ? (
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
