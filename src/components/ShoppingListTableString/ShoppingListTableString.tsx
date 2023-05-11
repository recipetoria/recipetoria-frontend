import { useState } from "react";
import Trash from "../../assets/svg/Trash";
import "./ShoppingListTableString.scss";
import customArrow from "../../assets/png/icon-up.png";
import measureValues from "../../assets/data/measureArray";
import ShoppingListTableItem from "./ShoppingListTableItem";
import getObjectForUpdate from "../../utils/updateSelectedObj";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeShopElement,
  updateShopElement,
} from "../../features/ShopListSlice";
import { SnackbarTextValue } from "../../features/SnackbarTextSlice";

/* eslint-disable jsx-a11y/control-has-associated-label */

interface IShoppingListTableString {
  id: number;
  name: string;
  amount: number;
  measureDefault: string;
  isLined: boolean;
  editMode: string;
  setActiveSelect: (id: number) => void;
  isActiveSelect: boolean;
}

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
  } = props;
  const [valueMeasure, setValueMeasure] = useState<string>(measureDefault);
  const shoppingItems = useAppSelector((state) => state.present.shopList.value);
  const dispatch = useAppDispatch();
  const [isDisabled, setDisabled] = useState<boolean>();
  const [hoverTrashId, setHoverTrashId] = useState<number | null>(null);

  const updateDisable = (value: boolean) => {
    setDisabled(value);
  };

  const measuresList = measureValues
    .filter((el) => el !== valueMeasure)
    .map((item) => (
      <button
        type="button"
        className="options__list-el"
        key={item}
        onClick={() => {
          setActiveSelect(0);
          setValueMeasure(item);
          dispatch(
            updateShopElement(
              getObjectForUpdate(id, item, shoppingItems, "measure")
            )
          );
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
        editMode={editMode}
        canItBeEmpty
        id={id}
        field="id"
        isDisable={updateDisable}
        isHoverByTrash={id === hoverTrashId}
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
          {valueMeasure || "select"}
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
            dispatch(SnackbarTextValue("The row was moved to trash"));
            dispatch(
              removeShopElement({
                id,
                name: "",
                amount: 0,
                measure: "",
              })
            );
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
