import { FocusEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IShoppingListItems } from "../../types/types";
import {
  updateShopElement,
  addNewShopElement,
} from "../../features/ShopListSlice";
import { shopListNewStringValue } from "../../features/ShopListNewStringSlice";
import getObjectForUpdate from "../../utils/updateSelectedObj";

interface IShoppingListTableItem {
  isLined: boolean;
  defaultValue: number | string;
  classMode: string;
  editMode: string;
  canItBeEmpty: boolean;
  id: number;
  field: string;
}

export default function ShoppingListTableItem(props: IShoppingListTableItem) {
  const {
    isLined,
    defaultValue,
    classMode,
    editMode,
    canItBeEmpty,
    id,
    field,
  } = props;
  const [value, setValue] = useState<string | number>(defaultValue);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const shoppingItems = useAppSelector((state) => state.shopList.value);
  const cellRef = useRef(null);

  useEffect(() => {
    if (cellRef.current && field === "name" && editMode === "new") {
      (cellRef.current as HTMLDivElement).focus();
    }
  }, [field, editMode]);

  function addNewElStore(e: FocusEvent<HTMLDivElement>) {
    const newEl: IShoppingListItems = {
      id: shoppingItems.length + 1,
      name: "",
      amount: 0,
      measure: "select",
    };
    if (e.currentTarget.textContent) {
      if (field === "name") {
        newEl.name = e.currentTarget.textContent;
      } else if (field === "amount") {
        newEl.amount = +e.currentTarget.textContent;
      }
    }
    dispatch(shopListNewStringValue(false));
    dispatch(addNewShopElement(newEl));
  }

  return (
    <div className={`td ${isLined ? "td__with-line" : ""}`}>
      <div
        id={id.toString()}
        className={`td__button ${classMode} ${
          value ? "" : "td__button_empty"
        } ${error ? "td__button_error" : ""}`}
        onInput={(e) => {
          if (e.currentTarget.textContent) {
            setValue(e.currentTarget.textContent);
            e.currentTarget.focus();
            const sel = document.getSelection();
            sel?.setBaseAndExtent(
              e.currentTarget,
              e.currentTarget.childNodes.length,
              e.currentTarget,
              e.currentTarget.childNodes.length
            );
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => {
          if (
            e.currentTarget.textContent?.trim() === "" &&
            canItBeEmpty === false
          ) {
            e.currentTarget.focus();
            setError("Can't be empty");
          } else if (field !== "id") {
            if (editMode === "edit") {
              if (e.currentTarget.textContent) {
                dispatch(
                  updateShopElement(
                    getObjectForUpdate(
                      id,
                      e.currentTarget.textContent,
                      shoppingItems,
                      field
                    )
                  )
                );
              }
            }
            if (editMode === "new") {
              addNewElStore(e);
            }
            setError("");
          }
        }}
        contentEditable={field !== "id"}
        suppressContentEditableWarning
        role="textbox"
        tabIndex={0}
        ref={cellRef}
      >
        {value}
      </div>
      {error ? <p className="error">{error}</p> : ""}
    </div>
  );
}
