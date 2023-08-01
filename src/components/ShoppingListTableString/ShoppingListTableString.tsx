import { useState } from "react";
import Trash from "../../assets/svg/Trash";
import "./ShoppingListTableString.scss";
import customArrow from "../../assets/png/icon-up.png";
import measureValues from "../../assets/data/measureArray";
import ShoppingListTableItem from "./ShoppingListTableItem";
import getObjectForUpdate from "../../utils/updateSelectedObj";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeIngredientByID,
  updateIngredient,
} from "../../features/ShopListSlice";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";
import { IShoppingListTableString } from "../../types/types";

/* eslint-disable jsx-a11y/control-has-associated-label */

export default function ShoppingListTableString(
  props: IShoppingListTableString
) {
  const {
    id,
    name,
    amount,
    measureDefault,
    isLined,
    editMode,
    setActiveSelect,
    isActiveSelect,
    number,
  } = props;
  const [valueMeasure, setValueMeasure] = useState<string>(measureDefault);
  const shoppingItems = useAppSelector((state) => state.present.shopList.value);
  const dispatch = useAppDispatch();
  const [isDisabled, setDisabled] = useState<boolean>();
  const [hoverTrashId, setHoverTrashId] = useState<number | null>(null);
  const token = useAppSelector((state) => state.present.authData.value.token);

  const updateDisable = (value: boolean) => {
    setDisabled(value);
  };

  const measuresList = measureValues
    .filter((el) => el !== valueMeasure)
    .sort()
    .map((item) => (
      <button
        type="button"
        className="options__list-el"
        key={item}
        onClick={() => {
          setActiveSelect(0);
          setValueMeasure(item);
          dispatch(
            updateIngredient(
              getObjectForUpdate(id, item, shoppingItems, "measurementUnit")
            )
          );
        }}
      >
        {item.toLowerCase()}
      </button>
    ));

  return (
    <>
      <ShoppingListTableItem
        isLined={isLined}
        defaultValue={id}
        classMode="td__button_id"
        editMode={editMode}
        canItBeEmpty
        id={id}
        field="id"
        isDisable={updateDisable}
        isHoverByTrash={id === hoverTrashId}
        number={number}
      />
      <ShoppingListTableItem
        isLined={isLined}
        defaultValue={name}
        classMode="td__button_name"
        editMode={editMode}
        canItBeEmpty={false}
        id={id}
        field="name"
        isDisable={updateDisable}
        isHoverByTrash={id === hoverTrashId}
      />
      <ShoppingListTableItem
        isLined={isLined}
        defaultValue={amount}
        classMode="td__button_amount"
        editMode={editMode}
        canItBeEmpty
        id={id}
        field="amount"
        isDisable={updateDisable}
        isHoverByTrash={id === hoverTrashId}
      />
      <div
        className={`td-select td ${
          isLined && !(id === hoverTrashId) ? "td__with-line" : ""
        } ${id === hoverTrashId ? "td_hover-by-trash" : ""}`}
      >
        <button
          type="button"
          className="td__button td__button_with-arrow"
          onClick={() => setActiveSelect(isActiveSelect ? 0 : id)}
          disabled={isDisabled}
        >
          {valueMeasure ? valueMeasure.toLowerCase() : "select"}
          <img
            src={customArrow}
            alt="arrow"
            className={isActiveSelect ? "arrow-up" : "arrow-down"}
          />
        </button>
        {isActiveSelect ? (
          <div className="options">
            <div className="options__list">{measuresList}</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`td-trash td ${
          isLined && !(id === hoverTrashId) ? "td__with-line" : ""
        } ${id === hoverTrashId ? "td_hover-by-trash" : ""}`}
      >
        <button
          type="button"
          className="td__button td__button_trash"
          onClick={() => {
            dispatch(
              SnackbarTextValue({
                text: "The row was moved to trash",
                withUndo: true,
              })
            );
            dispatch(removeIngredientByID({ id, token }));
          }}
          onMouseEnter={() => {
            setHoverTrashId(id);
          }}
          onMouseLeave={() => {
            setHoverTrashId(null);
          }}
        >
          <Trash />
        </button>
        {hoverTrashId && (
          <div className="popup-tip">
            <span>Delete</span>
          </div>
        )}
      </div>
    </>
  );
}
